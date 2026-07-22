"use client";

import React, { Suspense, useState } from "react";
import SearchInput from "./SearchInput";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import { SearchX } from "lucide-react";
import Link from "next/link";
import UserDrawer from "./UserDrawer";
import styles from "./table.module.css";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  birthDate?: string;
  age?: number;
  username?: string;
  image?: string;
  role?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  bank?: {
    cardType?: string;
    cardNumber?: string;
    cardExpire?: string;
    currency?: string;
  };
  company?: {
    name?: string;
    department?: string;
    title?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
}

interface UserTableProps {
  users: User[];
  total: number;
  page: number;
  limit: number;
  search: string;
}

export default function UserTable({
  users = [],
  total = 0,
  page = 1,
  limit = 8,
  search = "",
}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const startEntry = total === 0 ? 0 : (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, total);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  // Helper to capitalize first letter of gender
  const formatGender = (gender: string) => {
    if (!gender) return "-";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  // Deterministically derive user status
  const getUserStatus = (id: number) => {
    return id % 3 !== 0 ? "Active" : "Inactive";
  };

  return (
    <div className={styles.tableCard}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.titleArea}>
          <h2 className={styles.cardTitle}>All Customers</h2>
          <span className={styles.cardSubtitle}>Active Members</span>
        </div>
        <div className={styles.controlsArea}>
          <Suspense fallback={<div style={{ width: "200px", height: "38px", backgroundColor: "var(--border-color-muted)", borderRadius: "var(--border-radius-md)" }} />}>
            <SearchInput placeholder="Search" fontSize="12px" backgroundColor="var(--bg-page)" />
          </Suspense>
          <Suspense fallback={<div style={{ width: "120px", height: "38px", backgroundColor: "var(--border-color-muted)", borderRadius: "var(--border-radius-md)" }} />}>
            <SortDropdown />
          </Suspense>
        </div>
      </div>

      {/* Table Body / Wrapper */}
      {users.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px 20px",
            textAlign: "center",
            gap: "16px",
            height: '100%'
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "var(--border-color-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
            }}
          >
            <SearchX size={32} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-main)" }}>
              No Customer Found
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "340px" }}>
              {`We couldn't find any results matching "${search}". Try checking your spelling or clear the search.`}
            </p>
          </div>
          {search && (
            <Link
              href="/"
              className={styles.clearSearchBtn}
            >
              Clear Search
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Customer Name</th>
                  <th className={styles.th}>Gender</th>
                  <th className={styles.th}>Phone Number</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Country</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const status = getUserStatus(user.id);
                  const isStatusActive = status === "Active";

                  return (
                    <tr key={user.id} className={styles.row} onClick={() => handleRowClick(user)}>
                      <td className={styles.td} style={{ fontWeight: 600 }}>
                        {user.firstName} {user.lastName}
                      </td>
                      <td className={styles.td}>{formatGender(user.gender)}</td>
                      <td className={styles.td}>{user.phone || "-"}</td>
                      <td className={styles.td}>{user.email}</td>
                      <td className={styles.td}>{user.address?.country || "United States"}</td>
                      <td className={styles.td}>
                        <span
                          className={`${styles.statusPill} ${isStatusActive
                            ? styles.statusActive
                            : styles.statusInactive
                            }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className={styles.cardFooter}>
            <span className={styles.footerText}>
              Showing data {startEntry} to {endEntry} of {total.toLocaleString()} entries
            </span>
            <Suspense fallback={<div style={{ width: "200px", height: "30px", backgroundColor: "var(--border-color-muted)", borderRadius: "var(--border-radius-sm)" }} />}>
              <Pagination totalItems={total} itemsPerPage={limit} currentPage={page} />
            </Suspense>
          </div>
        </>
      )}

      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
