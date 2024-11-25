import Background from "@/components/landing_page_components/background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex grow flex-col">
      <Background/>
      {children}
    </main>
  );
}