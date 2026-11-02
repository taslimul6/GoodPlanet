'use client'

import { authClient } from "../lib/auth-client";
import { FormEvent } from "react";

export default function Login() {

  const handleSignIn = async (e: FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData.entries());

  const email = String(userData.email ?? "");
  const password = String(userData.password ?? "");

   const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",

})
}


const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};



  return (
    <main className="min-h-screen bg-bg text-fg flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
      
        <div className="bg-card border border-line rounded-3xl p-7 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-bold text-pri">Welcome back</p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              Sign in to your account
            </h1>

            <p className="mt-3 text-mut">
              Continue making a difference with GoodPlanet.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name='email'
                required
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-xl bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm font-bold text-pri hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <input
              name = 'password'
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl bg-bg border border-line outline-none focus:border-pri transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="size-4 accent-pri rounded"
              />
              <label htmlFor="remember" className="text-sm text-mut">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-pri text-on font-bold hover:opacity-90 transition"
            >
              Sign in
            </button>
          </form>

          <div className="relative my-7">
            <div className="border-t border-line" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 bg-card text-xs text-mut">
              OR
            </span>
          </div>

          <button

          onClick={googleSignIn}
            type="button"
            className="w-full h-12 rounded-full border border-line font-bold hover:bg-bg transition flex items-center justify-center gap-3"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.91c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.39 38.06 46.98 31.91 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.98-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-mut">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-bold text-pri hover:underline"
            >
              Create account
            </a>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-mut">
          By continuing, you agree to GoodPlanet's Terms of Service and
          Privacy Policy.
        </p>

        <a
          href="/"
          className="mt-6 flex justify-center text-sm font-semibold text-mut hover:text-pri transition"
        >
          ← Back to homepage
        </a>
      </div>
    </main>
  );
}
