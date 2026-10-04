"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: FormEvent) {
    e.preventDefault();

    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>

        <p className="muted">
          Your student documents, one secure place.
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={login}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button>Sign in</button>
        </form>

        <p>
          New student?{" "}
          <Link href="/auth/register">
            Create your locker
          </Link>
        </p>
      </div>
    </main>
  );
}