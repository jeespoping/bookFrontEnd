"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  async function handleDelete(e, bookId) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _method: "DELETE",
        }),
      }
    );

    if (res.ok) {
      window.location.href = "/libros";
    }
  }

  useEffect(() => {
    async function getBooks() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`
      );

      const response = await res.json();

      setData(response);
    }

    getBooks();
  }, []);

  return (
    <div>
      <h1>Libros</h1>
      <ul data-cy="book-list">
        {data.map((book) => (
          <li key={`book-${book.id}`}>
            <Link
              data-cy={`link-to-visit-book-${book.id}`}
              href={`/libros/${book.id}`}
            >
              {book.title}
            </Link>

            {" - "}

            <Link
              data-cy={`link-to-edit-book-${book.id}`}
              href={`/libros/${book.id}/editar`}
            >
              Editar
            </Link>

            <form
              onSubmit={(e) => handleDelete(e, book.id)}
              style={{ display: "inline" }}
            >
              <button data-cy={`link-to-delete-book-${book.id}`}>
                Eliminar
              </button>
            </form>
          </li>
        ))}
      </ul>
      <br />
      <Link href="/libros/crear">Crear libro</Link>
    </div>
  );
}
