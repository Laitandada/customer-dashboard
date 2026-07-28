import React, { Suspense } from "react";
import StatsCards from "@/components/StatsCards";
import UserTable, { User } from "@/components/UserTable";
import SearchInput from "@/components/SearchInput";
import styles from "@/components/sidebar.module.css";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 300; // Revalidate the page cache every 5 minutes 

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  // Extract query parameters
  const search = typeof params.q === "string" ? params.q : "";
  const currentPage = Number(params.page) || 1;
  const sortBy = typeof params.sortBy === "string" ? params.sortBy : "id";
  const order = typeof params.order === "string" ? params.order : "desc";

  const limit = 8;
  const skip = (currentPage - 1) * limit;

  // Build the users API URL
  let usersApiUrl = `https://dummyjson.com/users/search?q=${encodeURIComponent(
    search
  )}&limit=${limit}&skip=${skip}`;

  if (sortBy) {
    usersApiUrl += `&sortBy=${sortBy}&order=${order}`;
  }

  const [usersRes, totalDbRes, avatarsRes] = await Promise.all([
    fetch(usersApiUrl, { next: { revalidate: 300 } }),
    fetch("https://dummyjson.com/users?limit=0", { next: { revalidate: 300 } }),
    fetch("https://dummyjson.com/users?limit=5", { next: { revalidate: 300 } }),
  ]);

  if (!usersRes.ok || !totalDbRes.ok || !avatarsRes.ok) {
    throw new Error("Failed to load user dashboard data from DummyJSON API.");
  }

  const [usersData, totalDbData, avatarsData] = await Promise.all([
    usersRes.json(),
    totalDbRes.json(),
    avatarsRes.json(),
  ]);

  const users: User[] = usersData.users || [];
  const totalItems = usersData.total || 0;
  const totalCustomers = totalDbData.total || 0;
  const membersCount = Math.round(totalCustomers * 0.67);

  const activeNow = Math.round(totalCustomers * 0.08);
  // Dummy active avatars from figma
  const activeAvatars: string[] = [
    "/images/avatarimage-one.svg",
    "/images/avatarimage-two.svg",
    "/images/avatarimage-three.svg",
    "/images/avatarimage-four.svg",
    "/images/avatarimage-five.svg",
  ];

  return (
    <>
      {/* Top Welcome Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 500,
            color: "var(--text-main)",
            letterSpacing: "0%",
          }}
        >
          Hello Evano 👋🏼,
        </h1>

        <div className={styles.searchContainer}>
          <Suspense fallback={<div style={{ width: "200px", height: "38px", backgroundColor: "var(--border-color-muted)", borderRadius: "var(--border-radius-md)" }} />}>
            <SearchInput placeholder="Search" fontSize="14px" backgroundColor="var(--bg-card)" />
          </Suspense>
        </div>


      </header>

      {/* Stats Cards Section */}
      <StatsCards
        totalCustomers={totalCustomers}
        membersCount={membersCount}
        activeNow={activeNow}
        activeAvatars={activeAvatars}
      />

      {/* User List / Table Section */}
      <UserTable
        users={users}
        total={totalItems}
        page={currentPage}
        limit={limit}
        search={search}
      />
    </>
  );
}
