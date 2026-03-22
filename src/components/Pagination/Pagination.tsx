// src/components/Pagination/Pagination.tsx
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { FC } from "react";
import css from "./Pagination.module.css";

type ModuleWithDefault = { default: FC<ReactPaginateProps> };
type DirectComponent = FC<ReactPaginateProps>;

const ReactPaginate =
  (ReactPaginateModule as unknown as ModuleWithDefault).default ||
  (ReactPaginateModule as unknown as DirectComponent);

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
