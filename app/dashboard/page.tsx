// app/dashboard/page.tsx

"use client";

import { useSession, signOut } from "next-auth/react";

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user.name || session?.user.email}!</p>
      <button
        onClick={() => signOut()}
        style={{ padding: "0.5rem 1rem" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
