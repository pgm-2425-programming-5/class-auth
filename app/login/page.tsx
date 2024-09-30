// app/login/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  const handleLoginWithGitHub = async () => {
    const res = await signIn("github", { redirect: false });
    if (!res?.error) {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            required
            id="email"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            required
            id="password"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
      <hr style={{ margin: "2rem 0" }} />
      <button
        onClick={handleLoginWithGitHub}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
