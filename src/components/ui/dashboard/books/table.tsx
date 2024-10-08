"use client";

import { UpdateBook, DeleteBook } from "./buttons";
import { GenericColumn } from "../../table/columns";
import { DataTable } from "@/components/ui/table/data-table";
import { IBook } from "@/lib/book-management/models/books.model"; 

// Define columns for DataTable
const createBooksColumns = (
  pendingReturnTransactions: number[]
): GenericColumn<IBook>[] => [
  {
    accessorKey: "id",
    header: "Book Id",
  },
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "availableNumberOfCopies",
    header: "Avl Copies",
  },
  {
    header: "Actions", 
    render: (book: IBook) => {
      const bookId = book.id;
      const isPending = pendingReturnTransactions.includes(bookId);

      return (
        <div className="flex justify-start gap-3">
          <UpdateBook id={bookId} title={book.title} />
          {/* Only show the Delete button if there are no pending transactions */}
          {!isPending && <DeleteBook id={bookId} />}
        </div>
      );
    },
  },
];

export default function UsersTable({
  data,
  pendingReturnTransactions,
}: {
  data: IBook[];
  pendingReturnTransactions: number[];
}) {
  const formattedData = data;

  return (
    <div className="mt-6 w-full  max-w-full flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {formattedData.map((book) => {
              const isPending = pendingReturnTransactions.some(
                (bookId) => bookId === book.id
              );
              return (
                <div
                  key={book.id}
                  className="mb-2 w-full rounded-md bg-white p-4 shadow-md"
                >
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <p className="text-sm text-gray-500">{book.title}</p>
                      <p className="ml-4 text-sm text-gray-500">
                        {book.author}
                      </p>
                    </div>
                    <div className="flex justify-start gap-3 pt-4">
                      <UpdateBook id={book.id} title={book.title} />
                      {!isPending && <DeleteBook id={book.id} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop view using DataTable */}
          <DataTable
            columns={createBooksColumns(pendingReturnTransactions)}
            data={formattedData}
            initialSortKey="id"
          />
        </div>
      </div>
    </div>
  );
}
