"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("api/auth/signin");
    },
  });
  console.log("user session ", session);
  if (status === "loading") {
    return <h1>Loading</h1>;
  }
  return (
    <>
      {session ? (
        <Link
          className="bg-red-400 p-3 mt-4 text-white rounded-md"
          href={"api/auth/signout"}
        >
          Sign Out
        </Link>
      ) : (
        <button
          className="bg-green-400 p-3 mt-4 text-white rounded-md mr-4"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}

      <Link className="p-2 bg-blue-400 ml-4 mt-4" href="/register">
        Register
      </Link>
      <Link className="p-2 bg-blue-400 ml-4 mt-4" href="/adminDashboard">
        Dashboard
      </Link>

      <div className="mb-6 text-sm font-semibold underline underline-offset-4 mt-4">
        status:{status}
      </div>
      <div>
        {session ? (
          <pre>{JSON.stringify(session, null, 2)}</pre>
        ) : (
          "No active user"
        )}
      </div>
    </>
  );
};
export default Home;
