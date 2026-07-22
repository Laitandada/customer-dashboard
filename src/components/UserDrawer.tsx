"use client";

import React, { useEffect, useState } from "react";
import { X, CreditCard, Briefcase, MapPin, User as UserIcon } from "lucide-react";
import { User } from "./UserTable";
import styles from "./drawer.module.css";

interface UserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function UserDrawer({ isOpen, onClose, user }: UserDrawerProps) {

  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setActiveUser(user);
    }
  }, [user]);

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const displayUser = user || activeUser;

  if (!displayUser) return null;

  // Format credit card number to show last 4 digits
  const formatCardNumber = (cardNum?: string) => {
    if (!cardNum) return "•••• •••• •••• ••••";
    const cleaned = cardNum.replace(/\s+/g, "");
    const last4 = cleaned.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  // Capitalize first letter of gender
  const formatGender = (g?: string) => {
    if (!g) return "-";
    return g.charAt(0).toUpperCase() + g.slice(1);
  };

  return (
    <>
      {/* Dimmed glass overlay backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Customer Details"
      >
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.profileSummary}>
            <img
              src={displayUser.image || "https://dummyjson.com/icon/emilys/128"}
              alt={`${displayUser.firstName} ${displayUser.lastName}`}
              className={styles.avatar}
            />
            <div className={styles.nameInfo}>
              <h2 className={styles.fullName}>
                {displayUser.firstName} {displayUser.lastName}
              </h2>
              <span className={styles.titleRole}>
                {displayUser.company?.title || displayUser.role || "Customer"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Drawer Content */}
        <div className={styles.drawerContent}>
          {/* Financial details - Credit Card mockup */}
          <div className={styles.field}>
            <h3 className={styles.sectionTitle}>
              <CreditCard size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              Payment Method
            </h3>
            <div className={styles.creditCard}>
              <div className={styles.cardHeaderRow}>
                <span className={styles.cardType}>
                  {displayUser.bank?.cardType || "Credit Card"}
                </span>
                <div className={styles.cardChip} />
              </div>
              <div className={styles.cardNumber}>
                {formatCardNumber(displayUser.bank?.cardNumber)}
              </div>
              <div className={styles.cardFooterRow}>
                <div className={styles.cardHolder}>
                  <span className={styles.cardHolderLabel}>Card Member</span>
                  <span className={styles.cardHolderName}>
                    {displayUser.firstName} {displayUser.lastName}
                  </span>
                </div>
                <div className={styles.cardExpiry}>
                  <span className={styles.cardExpiryLabel}>Expires</span>
                  <span className={styles.cardExpiryDate}>
                    {displayUser.bank?.cardExpire || "MM/YY"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className={styles.sectionTitle}>
              <UserIcon size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              Personal Info
            </h3>
            <div className={styles.gridFields}>
              <div className={styles.field}>
                <span className={styles.label}>Username</span>
                <span className={styles.value}>@{displayUser.username || "n/a"}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Age / Gender</span>
                <span className={styles.value}>
                  {displayUser.age ? `${displayUser.age} yrs` : "-"} / {formatGender(displayUser.gender)}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Birth Date</span>
                <span className={styles.value}>{displayUser.birthDate || "-"}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{displayUser.phone || "-"}</span>
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Email Address</span>
                <span className={styles.value}>{displayUser.email}</span>
              </div>
            </div>
          </div>

          {/* Employment/Work details */}
          <div>
            <h3 className={styles.sectionTitle}>
              <Briefcase size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              Work Details
            </h3>
            <div className={styles.gridFields}>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Company</span>
                <span className={styles.value}>{displayUser.company?.name || "-"}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Department</span>
                <span className={styles.value}>{displayUser.company?.department || "-"}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Title</span>
                <span className={styles.value}>{displayUser.company?.title || "-"}</span>
              </div>
            </div>
          </div>

          {/* Location details */}
          <div>
            <h3 className={styles.sectionTitle}>
              <MapPin size={12} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              Home Address
            </h3>
            <div className={styles.gridFields}>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Street Address</span>
                <span className={styles.value}>{displayUser.address?.address || "-"}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>City / State</span>
                <span className={styles.value}>
                  {displayUser.address?.city || "-"}
                  {displayUser.address?.state ? `, ${displayUser.address.state}` : ""}
                </span>
              </div>
              <div className={styles.field}>
                <span className={styles.label}>Postal Code</span>
                <span className={styles.value}>{displayUser.address?.postalCode || "-"}</span>
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.label}>Country</span>
                <span className={styles.value}>{displayUser.address?.country || "United States"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
