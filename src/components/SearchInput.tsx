"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  fontSize?: string;
  backgroundColor?: string;
}

export default function SearchInput({ placeholder = "Search", fontSize, backgroundColor }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialQuery = searchParams.get("q") || "";
  const [value, setValue] = useState(initialQuery);
  const lastSentValue = useRef(initialQuery);


  useEffect(() => {
    if (initialQuery !== lastSentValue.current) {
      setValue(initialQuery);
      lastSentValue.current = initialQuery;
    }
  }, [initialQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== initialQuery) {
        startTransition(() => {
          const params = new URLSearchParams(searchParams.toString());
          if (value) {
            params.set("q", value);
          } else {
            params.delete("q");
          }
          params.set("page", "1");
          lastSentValue.current = value;
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, initialQuery, pathname, router, searchParams]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "216px" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "14px",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          color: "#7E7E7E",
          pointerEvents: "none",
        }}
      >
        {isPending ? (
          <Loader2 className="animate-spin" size={18} style={{ animation: "spin 1s linear infinite" }} />
        ) : (
          <Search size={24} color="#7E7E7E" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px 10px 44px",
          fontSize: fontSize,
          fontWeight: 400,
          color: "var(--text-main)",
          backgroundColor: backgroundColor,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--border-color)",
          borderRadius: "var(--border-radius-md)",
          outline: "none",
          transition: "var(--transition-smooth)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--primary-accent)";
          e.target.style.boxShadow = "0px 0px 0px 3px rgba(89, 50, 234, 0.15)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border-color)";
          e.target.style.boxShadow = "none";
        }}
      />
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
