import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Better Auth and the Express API share one database, so deleting an account here can
// also clean up the business collections that the API owns.
const client = new MongoClient(process.env.MONGODB_URI ?? "");
const db = client.db("goodPlanet");

/**
 * Removes everything that belongs to a user: their events, and every booking, bookmark,
 * waitlist entry and follow that points at them or at their events.
 */
async function deleteUserData(email: string) {
  const ownEvents = await db.collection("events").find({ email }, { projection: { _id: 1 } }).toArray();
  const ownEventIds = ownEvents.map((e) => String(e._id));
  const byUserOrOwnEvent = { $or: [{ email }, { eventId: { $in: ownEventIds } }] };

  await Promise.all([
    db.collection("events").deleteMany({ email }),
    db.collection("bookedEvents").deleteMany(byUserOrOwnEvent),
    db.collection("savedEvents").deleteMany(byUserOrOwnEvent),
    db.collection("waitlist").deleteMany(byUserOrOwnEvent),
    db.collection("follows").deleteMany({ email }),
  ]);
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, { client }),

  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    // shown and edited on /profile
    additionalFields: {
      bio: { type: "string", required: false, input: true },
    },
    // lets people delete their own account from /profile
    deleteUser: {
      enabled: true,
      beforeDelete: (user) => deleteUserData(user.email),
    },
  },

  // The JWT is what the Express API verifies (it downloads the keys from /api/auth/jwks).
  plugins: [jwt()],

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
});
