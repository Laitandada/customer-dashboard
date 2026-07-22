"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Hexagon,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Bolt,
} from "lucide-react";
import styles from "./sidebar.module.css";



interface NavItem {
  name: string;
  icon: string;
  hasSubmenu?: boolean;
  isActive?: boolean;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Load and apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, []);

  // Apply theme when state updates (only after client mount to prevent SSR side-effects)
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: "/icons/dashboard-icon.svg",
    },
    {
      name: "Product",
      icon: "/icons/product-icon.svg",
      hasSubmenu: true,
    },
    {
      name: "Customers",
      icon: "/icons/customer-icon.svg",
      hasSubmenu: true,
      isActive: true,
    },
    {
      name: "Income",
      icon: "/icons/wallet-icon.svg",
      hasSubmenu: true,
    },
    {
      name: "Promote",
      icon: "/icons/promote-icon.svg",
      hasSubmenu: true,
    },
    {
      name: "Help",
      icon: "/icons/help-icon.svg",
      hasSubmenu: true,
    },
  ];

  return (
    <>
      {/* Mobile Fixed Top Bar */}
      <div className={styles.mobileHeader}>
        <div className={styles.logoContainer}>
          <Bolt className={styles.logoIcon} size={28} />
          <span className={styles.logoText}>
            Dashboard <span className={styles.logoVersion}>v.01</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div style={{ width: 20, height: 20 }} />
            ) : theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.menuToggleBtn}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Main Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""} ${isMinimized ? styles.sidebarMinimized : ""
          }`}
      >
        <div className={styles.topSection}>
          <div className={styles.header}>

            <div
              className={`${styles.logoContainer} ${isMinimized ? styles.logoMinimized : ""
                }`}
              onClick={() => isMinimized && setIsMinimized(false)}
              aria-label={isMinimized ? "Open sidebar" : undefined}
              role={isMinimized ? "button" : undefined}
              tabIndex={isMinimized ? 0 : undefined}
              onKeyDown={(e) => {
                if (isMinimized && (e.key === "Enter" || e.key === " ")) {
                  setIsMinimized(false);
                }
              }}
            >
              <Bolt className={styles.logoIcon} size={32} strokeWidth={1.5} />
              <span className={styles.logoText}>
                Dashboard <span className={styles.logoVersion}>v.01</span>
              </span>

              {isMinimized && (
                <span className={styles.logoTooltip} aria-hidden="true">
                  Open sidebar
                </span>
              )}
            </div>


            {!isMinimized && (
              <div className={styles.headerControls}>
                <button
                  onClick={toggleTheme}
                  className={styles.themeToggle}
                  style={{ display: "flex" }}
                  aria-label="Toggle Theme"
                >
                  {!mounted ? (
                    <div style={{ width: 18, height: 18 }} />
                  ) : theme === "light" ? (
                    <Moon size={18} />
                  ) : (
                    <Sun size={18} />
                  )}
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className={styles.minimizeBtn}
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>
            )}
          </div>

          <nav>
            <ul className={styles.navMenu}>
              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  className={`${styles.navItem} ${item.isActive ? styles.navItemActive : ""
                    }`}
                  onClick={() => setIsOpen(false)}
                  title={isMinimized ? item.name : undefined}
                >
                  <div className={styles.navItemLeft}>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={18}
                      height={18}
                      className={styles.navItemIcon}
                    />
                    <span className={styles.navItemLabel}>{item.name}</span>
                  </div>
                  {item.hasSubmenu && !isMinimized && (
                    <ChevronRight className={styles.chevron} />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>


        <div className={styles.bottomSection}>

          {/* Promo Widget */}
          {!isMinimized && (
            < div className={styles.promoCard}>
              <p className={styles.promoTitle}>
                Upgrade to PRO to get access all Features!
              </p>
              <button className={styles.promoButton}>Get Pro Now!</button>
            </div>
          )}

          {/* User Profile */}
          <div
            className={styles.profileFooter}
          >
            <div className={styles.profileInfo}>
              <Image
                src="/images/avatarimage.svg"
                alt="Evano Profile Picture"
                className={styles.avatar}
                width={42}
                height={42}
                priority
              />

              {!isMinimized && (
                <div className={styles.profileMeta}>
                  <span className={styles.profileName}>Evano</span>
                  <span className={styles.profileRole}>Project Manager</span>
                </div>
              )}
            </div>

            {!isMinimized && (
              <ChevronDown
                className={styles.profileChevron}
                size={18}
              />
            )}

            {isMinimized && (
              <span className={styles.logoTooltip} aria-hidden="true">
                Evano
              </span>
            )}
          </div>
        </div>



      </aside >
    </>
  );
}
