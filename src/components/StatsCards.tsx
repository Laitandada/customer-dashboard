import React from "react";
import { Users, UserCheck, Monitor, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import styles from "./stats.module.css";

interface StatsCardsProps {
  totalCustomers: number;
  membersCount: number;
  activeNow: number;
  activeAvatars: string[];
}

export default function StatsCards({
  totalCustomers = 0,
  membersCount = 0,
  activeNow = 0,
  activeAvatars = [],
}: StatsCardsProps) {


  return (
    <div className={styles.statsGrid}>
      {/* Total Customers */}
      <div className={styles.card}>
        <div className={`${styles.iconWrapper} ${styles.customersIcon}`}>
          <Image
            src="/icons/members-icon.svg"
            alt="Users"
            width={42}
            height={42}
            className={styles.icon}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>Total Customers</span>
          <span className={styles.value}>{totalCustomers.toLocaleString()}</span>
          <span className={styles.trend}>
            <span className={styles.trendUp}>
              <ArrowUp size={14} style={{ display: "inline", verticalAlign: "middle" }} /> 16%
            </span>
            <span className={styles.trendLabel}>this month</span>
          </span>
        </div>
      </div>

      {/* divider */}
      <div className={styles.cardDivider} />


      {/* Members */}
      <div className={styles.card}>
        <div className={`${styles.iconWrapper} ${styles.membersIcon}`}>
          <Image
            src="/icons/member-icon.svg"
            alt="Users"
            width={42}
            height={42}
            className={styles.icon}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>Members</span>
          <span className={styles.value}>{membersCount.toLocaleString()}</span>
          <span className={styles.trend}>
            <span className={styles.trendDown}>
              <ArrowDown size={14} style={{ display: "inline", verticalAlign: "middle" }} /> 1%
            </span>
            <span className={styles.trendLabel}>this month</span>
          </span>
        </div>
      </div>

      {/* divider */}
      <div className={styles.cardDivider} />

      {/* Active Now */}
      <div className={styles.card}>
        <div className={`${styles.iconWrapper} ${styles.activeIcon}`}>
          <Image
            src="/icons/monitor-icon.svg"
            alt="Users"
            width={42}
            height={42}
            className={styles.icon}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>Active Now</span>
          <span className={styles.value}>{activeNow.toLocaleString()}</span>
          {activeAvatars && activeAvatars.length > 0 && (
            <div className={styles.avatarStack}>
              {activeAvatars.map((avatar, idx) => (
                <Image
                  key={idx}
                  src={avatar}
                  alt={`Active User Avatar ${idx + 1}`}
                  className={styles.stackedAvatar}
                  style={{ zIndex: activeAvatars.length - idx }}
                  width={26}
                  height={26}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
