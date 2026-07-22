import React from "react";
import statsStyles from "@/components/stats.module.css";
import tableStyles from "@/components/table.module.css";

export default function Loading() {
  return (
    <>
      {/* Header Skeleton */}
      <header style={{ width: "100%", paddingBottom: "10px" }}>
        <div className="skeleton" style={{ width: "180px", height: "28px", borderRadius: "8px" }} />
      </header>

      {/* Stats Cards Skeleton */}
      <div className={statsStyles.statsGrid}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className={statsStyles.card} style={{ pointerEvents: "none" }}>
            <div
              className="skeleton"
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <div className={statsStyles.info} style={{ width: "100%", gap: "10px" }}>
              <div className="skeleton" style={{ width: "60%", height: "14px", borderRadius: "4px" }} />
              <div className="skeleton" style={{ width: "40%", height: "28px", borderRadius: "6px" }} />
              <div className="skeleton" style={{ width: "50%", height: "12px", borderRadius: "4px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* User Table Skeleton */}
      <div className={tableStyles.tableCard}>
        {/* Card Header Skeleton */}
        <div className={tableStyles.cardHeader}>
          <div className={tableStyles.titleArea} style={{ gap: "10px" }}>
            <div className="skeleton" style={{ width: "160px", height: "24px", borderRadius: "6px" }} />
            <div className="skeleton" style={{ width: "100px", height: "14px", borderRadius: "4px" }} />
          </div>
          <div className={tableStyles.controlsArea}>
            <div className="skeleton" style={{ width: "216px", height: "38px", borderRadius: "var(--border-radius-md)" }} />
            <div className="skeleton" style={{ width: "120px", height: "38px", borderRadius: "var(--border-radius-md)" }} />
          </div>
        </div>

        {/* Table Skeleton wrapper */}
        <div className={tableStyles.tableWrapper}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.th}>Customer Name</th>
                <th className={tableStyles.th}>Gender</th>
                <th className={tableStyles.th}>Phone Number</th>
                <th className={tableStyles.th}>Email</th>
                <th className={tableStyles.th}>Country</th>
                <th className={tableStyles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  <td className={tableStyles.td}>
                    <div className="skeleton" style={{ width: "110px", height: "16px", borderRadius: "4px" }} />
                  </td>
                  <td className={tableStyles.td}>
                    <div className="skeleton" style={{ width: "50px", height: "16px", borderRadius: "4px" }} />
                  </td>
                  <td className={tableStyles.td}>
                    <div className="skeleton" style={{ width: "100px", height: "16px", borderRadius: "4px" }} />
                  </td>
                  <td className={tableStyles.td}>
                    <div className="skeleton" style={{ width: "160px", height: "16px", borderRadius: "4px" }} />
                  </td>
                  <td className={tableStyles.td}>
                    <div className="skeleton" style={{ width: "90px", height: "16px", borderRadius: "4px" }} />
                  </td>
                  <td className={tableStyles.td}>
                    <div className="skeleton" style={{ width: "80px", height: "26px", borderRadius: "4px" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Footer Skeleton */}
        <div className={tableStyles.cardFooter}>
          <div className="skeleton" style={{ width: "240px", height: "16px", borderRadius: "4px" }} />
          <div className="skeleton" style={{ width: "160px", height: "26px", borderRadius: "4px" }} />
        </div>
      </div>
    </>
  );
}
