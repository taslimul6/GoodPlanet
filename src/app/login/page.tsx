"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";

import GoogleButton from "@/components/auth/GoogleButton";

import { authClient } from "../lib/auth-client";

export default function Login() {
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // on success Better Auth redirects to callbackURL; on failure tell the user why
    const { error } = await authClient.signIn.email({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      callbackURL: "/",
    });

    if (error) toast.error(error.message || "Could not sign in. Check your email and password.");
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

          <GoogleButton />

          <p className="mt-8 text-center text-sm text-mut">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-pri hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-mut">
          By continuing, you agree to GoodPlanet&apos;s Terms of Service and
          Privacy Policy.
        </p>

        <Link
          href="/"
          className="mt-6 flex justify-center text-sm font-semibold text-mut hover:text-pri transition"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
