import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, TrendingUp, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <header>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--text-main)",
            marginBottom: "8px",
          }}
        >
          Analytics Overview 📊
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          Welcome to your dummy main dashboard overview.
        </p>
      </header>

      {/* Grid Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            padding: "24px",
            borderRadius: "var(--border-radius-lg)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "50%",
              backgroundColor: "rgba(89, 50, 234, 0.1)",
              color: "var(--primary-accent)",
            }}
          >
            <DollarSign size={24} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>
              Total Revenue
            </span>
            <strong style={{ fontSize: "20px", color: "var(--text-main)" }}>$128,430</strong>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--bg-card)",
            padding: "24px",
            borderRadius: "var(--border-radius-lg)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 172, 79, 0.1)",
              color: "#00AC4F",
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>
              Monthly Sales
            </span>
            <strong style={{ fontSize: "20px", color: "var(--text-main)" }}>+24.5%</strong>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--bg-card)",
            padding: "24px",
            borderRadius: "var(--border-radius-lg)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 159, 41, 0.1)",
              color: "#FF9F29",
            }}
          >
            <Users size={24} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>
              Total Visitors
            </span>
            <strong style={{ fontSize: "20px", color: "var(--text-main)" }}>84,210</strong>
          </div>
        </div>
      </div>

      {/* Quick Link Card */}
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          padding: "28px",
          borderRadius: "var(--border-radius-lg)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-main)", marginBottom: "12px" }}>
          Looking for Customer Data?
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
          Head over to the <strong>Customers</strong> section in the sidebar to view the main technical test user dashboard.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            backgroundColor: "var(--primary-accent)",
            color: "#FFFFFF",
            borderRadius: "var(--border-radius-md)",
            fontSize: "14px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <Users size={18} />
          Go to Customers Dashboard
        </Link>
      </div>
    </div>
  );
}
