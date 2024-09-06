import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Toaster />
      <div className="mt-[100px]">{children}</div>
    </>
  );
}
