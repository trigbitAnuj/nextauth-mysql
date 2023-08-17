"use client";

import { Role } from "@/model/user/interface";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

type formValues = {
  username: string;
  email: string;
  password: string;
  role: Role | string;
};

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState<formValues>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
          role: formValues.role,
        }),
      });

      setLoading(false);
      if (!res.ok) {
        console.log((await res.json()).message);
        throw new Error((await res.json()).message);
      }
      const data = await res.json();
      alert(data.message);

      signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value, "line no. 58");
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-8">
        <label htmlFor="Username">Username</label>
        <input
          className="border-2 border-black p-2 text-gray-600"
          required
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input
          required
          className="border-2 border-black p-2 text-gray-600"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          className="border-2 border-black p-2 text-gray-600"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="password"
        />

        <label htmlFor="role">Role:</label>

        <select
          name="role"
          className="border-2 border-black p-2 text-gray-600"
          id="role"
          value={formValues.role}
          onChange={handleChange}
        >
          <option>--role--</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="bg-blue-400 p-2 text-white" disabled={loading}>
          {loading ? "loading..." : "Register"}
        </button>
      </form>
    </>
  );
};
