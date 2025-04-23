"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBook } from "../page";

export default function BookEdit({ params }) {
  const { bid } = params;

  const [bookTitle, setbookTitle] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bid}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: "PATCH",
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

  useEffect(() => {
    async function fetchBook() {
      const { title } = await getBook(bid);

      setbookTitle(title);
    }

    fetchBook();
  }, []);

  return (
    <div>
      <h1>Editar libro</h1>
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
