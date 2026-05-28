import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Studio 13",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
