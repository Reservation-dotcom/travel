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

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(payload));
      }

      localStorage.setItem("travel_auth_token", payload.token || "");
      localStorage.setItem("travel_user", JSON.stringify(payload.data || {}));
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to sign in.");
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
            <h1 className="text-3xl font-bold text-[#191e3b]">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">Access your trips, favorites, and saved bookings.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-sm text-[#191e3b] outline-none transition focus:border-[#006ce4] focus:ring-2 focus:ring-[#cfe2ff]"
                placeholder="Enter your password"
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#006ce4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0057b8] disabled:cursor-not-allowed disabled:bg-[#7aaef7]"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <span>Don&apos;t have an account?</span>
            <Link href="/signup" className="font-semibold text-[#006ce4] hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
