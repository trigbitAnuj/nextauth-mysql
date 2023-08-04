"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <label htmlFor="Username">Username</label>
        <input
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
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button className="bg-blue-400 p-2 text-white" disabled={loading}>
          {loading ? "loading..." : "Register"}
        </button>
      </form>
    </>
  );
};
