"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import GoogleButton from "@/components/auth/GoogleButton";

import { authClient } from "../lib/auth-client";

const hasUpper = (pw: string) => /[A-Z]/.test(pw);
const hasLower = (pw: string) => /[a-z]/.test(pw);
const hasNumber = (pw: string) => /\d/.test(pw);
const hasSpecial = (pw: string) => /[^a-zA-Z0-9]/.test(pw);

const isPasswordValid = (pw: string) =>
  pw.length >= 8 && hasNumber(pw) && hasUpper(pw) && hasSpecial(pw);

const requirementMet = (pw: string, check: (s: string) => boolean) =>
  check(pw);

const Signup = () => {
 const router = useRouter();

  const [passwordValue, setPasswordValue] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid(passwordValue)) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const name = String(userData.name ?? "");
    const email = String(userData.email ?? "");
    const password = String(userData.password ?? "");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Could not create your account.");
      return;
    }

    router.push("/");
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
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <div className="mt-2 text-xs space-y-1">
                <div className={`flex items-center gap-2 ${requirementMet(passwordValue, (s) => s.length >= 8) ? "text-pri" : "text-mut"}`}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border">
                    {passwordValue.length >= 8 ? "✓" : "✗"}
                  </span>
                  <span>Minimum 8 characters</span>
                </div>
                <div className={`flex items-center gap-2 ${requirementMet(passwordValue, hasUpper) ? "text-pri" : "text-mut"}`}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border">
                    {requirementMet(passwordValue, hasUpper) ? "✓" : "✗"}
                  </span>
                  <span>1 uppercase letter</span>
                </div>
                <div className={`flex items-center gap-2 ${requirementMet(passwordValue, hasLower) ? "text-pri" : "text-mut"}`}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border">
                    {requirementMet(passwordValue, hasLower) ? "✓" : "✗"}
                  </span>
                  <span>1 lowercase letter</span>
                </div>
                <div className={`flex items-center gap-2 ${requirementMet(passwordValue, hasNumber) ? "text-pri" : "text-mut"}`}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border">
                    {requirementMet(passwordValue, hasNumber) ? "✓" : "✗"}
                  </span>
                  <span>1 number</span>
                </div>
                <div className={`flex items-center gap-2 ${requirementMet(passwordValue, hasSpecial) ? "text-pri" : "text-mut"}`}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border">
                    {requirementMet(passwordValue, hasSpecial) ? "✓" : "✗"}
                  </span>
                  <span>1 special character</span>
                </div>
              </div>
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

          <GoogleButton />

          <p className="text-center text-sm text-mut mt-7">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pri font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="block text-center text-sm text-mut hover:text-pri transition mt-7"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
};

export default Signup;