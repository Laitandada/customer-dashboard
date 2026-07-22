"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard error caught by boundary:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: "40px 20px",
        textAlign: "center",
        gap: "24px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "rgba(223, 4, 4, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--status-inactive-color)",
          animation: "shake 0.5s ease-in-out",
        }}
      >
        <AlertCircle size={40} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--text-main)",
            letterSpacing: "-0.02em",
          }}
        >
          Something Went Wrong!
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            maxWidth: "460px",
            lineHeight: 1.6,
          }}
        >
          We encountered an error while fetching or rendering the customer data.
          This could be due to a temporary network glitch or API rate limits.
        </p>
        {error.message && (
          <div
            style={{
              marginTop: "10px",
              padding: "12px 16px",
              backgroundColor: "var(--border-color-muted)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--border-radius-md)",
              fontFamily: "monospace",
              fontSize: "12px",
              color: "var(--status-inactive-color)",
              textAlign: "left",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            <strong>Error details:</strong> {error.message}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => reset()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            backgroundColor: "var(--primary-accent)",
            border: "none",
            borderRadius: "var(--border-radius-md)",
            cursor: "pointer",
            transition: "var(--transition-smooth)",
            boxShadow: "0 4px 12px rgba(89, 50, 234, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-accent-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-accent)";
          }}
        >
          <RotateCcw size={16} />
          Try Again
        </button>

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--text-main)",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--border-radius-md)",
            cursor: "pointer",
            transition: "var(--transition-smooth)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--border-color-muted)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-card)";
          }}
        >
          Return Home
        </Link>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
