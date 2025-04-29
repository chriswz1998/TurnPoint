/**
 * CustomPagination component renders a pagination UI to navigate through pages.
 *
 * This component dynamically generates page numbers based on the current page and total pages.
 * It displays a maximum of 5 page numbers (this can be customized) and handles the navigation 
 * between pages. It also includes previous, next, and ellipsis for indicating the continuation of pages.
 *
 * Props:
 * - `currentPage`: The current active page.
 * - `totalPages`: The total number of pages available.
 * - `onPageChange`: A callback function that is triggered when a page is selected or when the user clicks next or previous.
 *
 * Pagination logic:
 * 1. It generates page numbers dynamically, ensuring that at least 5 pages are visible.
 * 2. If there are more pages than what can be displayed, it will add ellipsis to indicate more pages exist.
 * 3. It prevents page navigation beyond the available range (e.g., if the user is on the first page, they cannot go to a previous page).
 */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  // Dynamically generate page numbers, showing a maximum of 5 pages (you can customize this)
  /**
   * Generates the page numbers that will be displayed in the pagination component.
   * The maximum number of pages displayed is limited to 5, but this can be customized.
   * The pages will adjust based on the current page and total pages available.
   *
   * Example:
   * If currentPage = 5 and totalPages = 10, it will generate pages 3 to 7.
   */
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {/* Page numbers */}
        {generatePageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis indicating more pages */}
        {currentPage + 2 < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
