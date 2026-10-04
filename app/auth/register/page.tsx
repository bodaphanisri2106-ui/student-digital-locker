"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(e: FormEvent) {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
    } else {
      setError(
        "Account created. Check your email to confirm your account."
      );
    }

    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create your locker</h1>

        <p className="muted">
          Store your student documents securely in one place.
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={register}>
          <label>Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link href="/auth/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}