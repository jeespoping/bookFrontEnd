import BookEdit from "@/components/BookEdit";
import { getBook } from "../page";

export default async function BookEditPage({ params }) {
  const { bid } = await params;

  const { title } = await getBook(bid);

  return <BookEdit bid={bid} title={title} />;
}
