// Description: Default layout for dashboard pages.

import Sidebar from "@/components/dashboard-page-components/sidebar";
import Theme from "../../theme-provider";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden" suppressHydrationWarning>
      <Theme>
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main className="grow [&>*:first-child]:scroll-mt-16 bg-gray-900">
            {children}
          </main>
        </div>
      </Theme>
    </div>
  );
}
