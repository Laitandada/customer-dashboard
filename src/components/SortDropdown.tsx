"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface SortOption {
  label: string;
  sortBy: string;
  order: "asc" | "desc";
}

const sortOptions: SortOption[] = [
  { label: "Newest", sortBy: "id", order: "desc" },
  { label: "Oldest", sortBy: "id", order: "asc" },
  { label: "Name (A-Z)", sortBy: "firstName", order: "asc" },
  { label: "Name (Z-A)", sortBy: "firstName", order: "desc" },
];

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentSortBy = searchParams.get("sortBy") || "id";
  const currentOrder = (searchParams.get("order") as "asc" | "desc") || "desc";

  // Find currently active option
  const activeOption =
    sortOptions.find(
      (opt) => opt.sortBy === currentSortBy && opt.order === currentOrder
    ) || sortOptions[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", option.sortBy);
    params.set("order", option.order);
    params.set("page", "1"); // Reset to page 1
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", zIndex: 50 }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--text-muted)",
          backgroundColor: "var(--bg-page)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--border-color)",
          borderRadius: "var(--border-radius-md)",
          cursor: "pointer",
          outline: "none",
          transition: "var(--transition-smooth)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--text-muted)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "var(--border-color)";
          }
        }}
      >
        <span>Sort by : </span>
        <span style={{ fontWeight: 600, color: "var(--text-main)" }}>
          {activeOption.label}
        </span>
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            color: "var(--text-muted)",
          }}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            width: "160px",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--border-radius-md)",
            boxShadow: "var(--shadow-premium)",
            padding: "6px 0",
            listStyle: "none",
            margin: 0,
            overflow: "hidden",
            animation: "fadeInUp 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {sortOptions.map((option, idx) => {
            const isSelected =
              option.sortBy === activeOption.sortBy &&
              option.order === activeOption.order;

            return (
              <li key={idx}>
                <button
                  onClick={() => handleSelect(option)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: "12px",
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? "var(--primary-accent)" : "var(--text-main)",
                    backgroundColor: isSelected ? "var(--primary-accent-light)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                    transition: "var(--transition-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "var(--border-color-muted)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
