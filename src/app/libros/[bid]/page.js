import Link from "next/link";

export default async function BookDetail({ params }) {
  const { bid } = await params;
  const { title } = await getBook(bid);

  return (
    <div>
      <h1>{title}</h1>
      <Link href="/libros">Ver lista de libros</Link>
    </div>
  );
}

export async function getBook(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`
  );

  const data = await res.json();

  return data;
}
