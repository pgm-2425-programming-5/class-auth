// app/page.tsx

"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>Next.js Auth App</h1>
      {session ? (
        <>
          <p>Welcome, {session.user.name || session.user.email}!</p>
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
          <br />
          <button
            onClick={() => signOut()}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <Link href="/login">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
