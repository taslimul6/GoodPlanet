import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI ?? "");
const db = client.db('goodPlanet');

export const auth = betterAuth({

baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    user: {
      // extra profile field shown on /profile
      additionalFields: {
        bio: { type: "string", required: false, input: true },
      },
      // lets users delete their own account from /profile
      deleteUser: {
        enabled: true,
        beforeDelete: async (user) => {
          const email = user.email;
          const mine = await db
            .collection("events")
            .find({ email }, { projection: { _id: 1 } })
            .toArray();
          const myEventIds = mine.map((e) => String(e._id));

          // remove everything that belongs to (or points at) this user
          await Promise.all([
            db.collection("events").deleteMany({ email }),
            db.collection("bookedEvents").deleteMany({
              $or: [{ email }, { eventId: { $in: myEventIds } }],
            }),
            db.collection("savedEvents").deleteMany({
              $or: [{ email }, { eventId: { $in: myEventIds } }],
            }),
            db.collection("follows").deleteMany({ email }),
            db.collection("waitlist").deleteMany({
              $or: [{ email }, { eventId: { $in: myEventIds } }],
            }),
          ]);
        },
      },
    },

    plugins: [
        jwt()
    ], 
    session: {
      cookieCache: {
        enabled: true,
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    }
});