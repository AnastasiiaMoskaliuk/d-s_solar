"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/data/supabase/client";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-Mail oder Passwort ist falsch.");
      setLoading(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
      <div>
        <label className="mb-[7px] block text-[15px] font-semibold text-[#154b4b]">
          E-Mail
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
          required
          className="w-full rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
        />
      </div>

      <div>
        <label className="mb-[7px] block text-[15px] font-semibold text-[#154b4b]">
          Passwort
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          required
          className="w-full rounded-[10px] border border-[#ddd] px-[15px] py-[12px] outline-none transition focus:border-[#154b4b]"
        />
      </div>

      {error && (
        <p className="rounded-[10px] bg-red-50 px-[15px] py-[10px] text-[14px] text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-[10px] bg-[#154b4b] px-[20px] py-[13px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Anmelden..." : "Anmelden"}
      </button>
    </form>
  );
};

export default LoginForm;