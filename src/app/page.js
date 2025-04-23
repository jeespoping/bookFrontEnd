import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Books App</h1>

      <Link data-cy="link-to-books" href="/libros">
        Book List
      </Link>
    </div>
  );
}
