"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const error = window.location.search.split("=")[1];
    setError(error);
  }, []);

  return (
    <div className="flex items-center justify-center px-2 md:px-0">
      <div>
        <h1 className="text-sm font-semibold text-black mt-5"> {error}</h1>
        <h3 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          We can&apos;t find that page
        </h3>
        <p className="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-6 flex items-center space-x-3">
          <button
            onClick={() => router.push("api/auth/signin")}
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
