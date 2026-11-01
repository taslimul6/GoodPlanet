"use client";



import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

const Signup = () => {
 const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { name, email, password } = userData;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (data) {
      router.push("/");
    }
  };

const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

  return (
    <main className="min-h-screen bg-bg text-fg flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-line rounded-3xl p-7 sm:p-9 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Create an account
            </h1>
            <p className="text-mut mt-2">
              Join our community and start making a difference.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignUp}>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="w-full h-12 px-4 rounded-xl bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-xl bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Create a password"
                className="w-full h-12 px-4 rounded-xl bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm password
              </label>
              <input
                type="password"
                required
                placeholder="Confirm your password"
                className="w-full h-12 px-4 rounded-xl bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-mut">
              <input
                type="checkbox"
                required
                className="mt-1 accent-pri"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-pri font-semibold hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-pri font-semibold hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-pri text-on font-bold hover:opacity-90 transition"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-mut font-semibold">OR</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <button

          onClick={googleSignIn}
            type="button"
            className="w-full h-12 rounded-full border border-line bg-bg font-semibold flex items-center justify-center gap-3 hover:bg-line/30 transition"
          >
            <svg viewBox="0 0 48 48" className="size-5">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.09 13.22l7.98 6.19C12.96 13.72 18.03 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.98 6.19c4.66-4.3 6.78-10.62 6.78-17.84Z"
              />
              <path
                fill="#FBBC05"
                d="M11.07 28.59A14.4 14.4 0 0 1 10.3 24c0-1.59.27-3.13.77-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.59 10.78l8.48-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.98-6.19c-2.22 1.49-5.06 2.38-7.92 2.38-5.97 0-11.04-4.22-12.93-9.91l-8.48 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-mut mt-7">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pri font-bold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>

        <a
          href="/"
          className="block text-center text-sm text-mut hover:text-pri transition mt-7"
        >
          ← Back to homepage
        </a>
      </div>
    </main>
  );
};

export default Signup;