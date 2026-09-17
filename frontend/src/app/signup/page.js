"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getErrorMessage(payload) {
  if (Array.isArray(payload?.detail)) {
    return payload.detail.map((item) => item.msg || "Invalid field").join(", ");
  }

  if (typeof payload?.detail === "string") {
    return payload.detail;
  }

  if (typeof payload?.message === "string") {
    return payload.message;
  }

  return "Something went wrong. Please try again.";
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(payload));
      }

      setSuccess("Account created successfully. Redirecting to sign in...");
      setTimeout(() => router.push("/signin"), 1200);
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] text-[#191e3b]">
      <Header />

      <main className="mx-auto flex max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f1ff] text-[#006ce4]">
              <span className="text-xl font-bold">E</span>
            </div>
            <h1 className="text-3xl font-bold text-[#191e3b]">Create account</h1>
            <p className="mt-2 text-sm text-gray-600">Sign up to save trips and unlock member deals.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-[#191e3b] outline-none transition focus:border-[#006ce4] focus:ring-2 focus:ring-[#cfe2ff]"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-[#191e3b] outline-none transition focus:border-[#006ce4] focus:ring-2 focus:ring-[#cfe2ff]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-[#191e3b] outline-none transition focus:border-[#006ce4] focus:ring-2 focus:ring-[#cfe2ff]"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-[#191e3b] outline-none transition focus:border-[#006ce4] focus:ring-2 focus:ring-[#cfe2ff]"
                placeholder="Re-enter your password"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                {success}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#006ce4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0057b8] disabled:cursor-not-allowed disabled:bg-[#7aaef7]"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>Already have an account?</span>
            <Link href="/signin" className="font-semibold text-[#006ce4] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
