"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookCreate() {
  const [bookTitle, setbookTitle] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
        }),
      }
    );

    if (res.ok) {
      setErrors([]);
      setbookTitle("");
      return router.push("/libros");
    }

    const data = await res.json();
    setErrors(data.errors);
    setLoading(false);
  }

  return (
    <div>
      <h1>Crear</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setbookTitle(e.target.value)}
          value={bookTitle}
          disabled={loading}
          type="text"
        />
        <button disabled={loading}>{loading ? "Enbiando..." : "Enviar"}</button>

        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
      </form>
      <br />
      <Link href="/libros">Lista de libros</Link>
    </div>
  );
}
