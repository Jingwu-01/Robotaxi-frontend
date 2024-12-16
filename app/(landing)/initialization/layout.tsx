import Background from "@/components/landing-page-components/background";

// initialization page layout
export default function InitLayout({
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