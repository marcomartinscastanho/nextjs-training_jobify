import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
}

const ComplexPaginationContainer: FC<Props> = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrevClick = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) {
      prevPage = totalPages;
    }
    handlePageChange(prevPage);
  };

  const handleNextClick = () => {
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) {
      nextPage = 1;
    }
    handlePageChange(nextPage);
  };

  interface PageButtonProps {
    page: number;
    active: boolean;
  }

  const addPageButton = ({ page, active }: PageButtonProps) => (
    <Button
      key={page}
      size="icon"
      onClick={() => handlePageChange(page)}
      variant={active ? "default" : "outline"}
    >
      {page}
    </Button>
  );

  const renderPageButtons = () => {
    const pageButtons: ReactNode[] = [];

    // first page
    pageButtons.push(addPageButton({ page: 1, active: currentPage === 1 }));
    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" key="dots-1" variant="outline" disabled>
          ...
        </Button>,
      );
    }
    // one before current page
    if (currentPage > 2) {
      pageButtons.push(addPageButton({ page: currentPage - 1, active: false }));
    }
    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(addPageButton({ page: currentPage, active: true }));
    }
    // one after current page
    if (currentPage < totalPages - 1) {
      pageButtons.push(addPageButton({ page: currentPage + 1, active: false }));
    }
    // dots
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" key="dots-2" variant="outline" disabled>
          ...
        </Button>,
      );
    }
    // last page
    pageButtons.push(
      addPageButton({ page: totalPages, active: currentPage === totalPages }),
    );

    return pageButtons;
  };

  return (
    <div className="flex gap-x-2">
      {/* prev */}
      <Button
        className="flex items-center gap-x-2"
        variant="outline"
        onClick={handlePrevClick}
      >
        <ChevronLeft />
        prev
      </Button>
      {renderPageButtons()}
      <Button
        className="flex items-center gap-x-2"
        variant="outline"
        onClick={handleNextClick}
      >
        next
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ComplexPaginationContainer;
