"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems = 0,
  itemsPerPage = 8,
  currentPage = 1,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {

      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);


      let adjustedStart = start;
      let adjustedEnd = end;

      if (currentPage <= 3) {
        adjustedEnd = 4;
      }
      if (currentPage >= totalPages - 2) {
        adjustedStart = totalPages - 3;
      }

      for (let i = adjustedStart; i <= adjustedEnd; i++) {

        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }


      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const activeBtnStyle: React.CSSProperties = {
    backgroundColor: "var(--primary-accent)",
    color: "#FFFFFF",
    borderColor: "var(--primary-accent)",
  };

  const btnBaseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "26px",
    borderRadius: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--border-color)",
    backgroundColor: "var(--border-color-muted)",
    color: "#404B52",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "var(--transition-smooth)",
    textDecoration: "none",
  };

  const disabledStyle: React.CSSProperties = {
    opacity: 0.4,
    pointerEvents: "none",
    cursor: "not-allowed",
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "8px" }} aria-label="Pagination Navigation">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          style={btnBaseStyle}
          aria-label="Previous Page"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--primary-accent)";
            e.currentTarget.style.color = "var(--primary-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-main)";
          }}
        >
          <ChevronLeft size={14} />
        </Link>
      ) : (
        <span style={{ ...btnBaseStyle, ...disabledStyle }} aria-hidden="true">
          <ChevronLeft size={14} />
        </span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((num, idx) => {
        const isEllipsis = num === "...";
        const isActive = num === currentPage;

        if (isEllipsis) {
          return (
            <span
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "26px",
                fontSize: "12px",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              ...
            </span>
          );
        }

        return (
          <Link
            key={idx}
            href={createPageUrl(num)}
            style={{
              ...btnBaseStyle,
              ...(isActive ? activeBtnStyle : {}),
            }}
            aria-label={`Go to page ${num}`}
            aria-current={isActive ? "page" : undefined}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "var(--primary-accent)";
                e.currentTarget.style.color = "var(--primary-accent)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.color = "var(--text-main)";
              }
            }}
          >
            {num}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          style={btnBaseStyle}
          aria-label="Next Page"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--primary-accent)";
            e.currentTarget.style.color = "var(--primary-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.color = "var(--text-main)";
          }}
        >
          <ChevronRight size={14} />
        </Link>
      ) : (
        <span style={{ ...btnBaseStyle, ...disabledStyle }} aria-hidden="true">
          <ChevronRight size={14} />
        </span>
      )}
    </nav>
  );
}
