import Sidebar from "../_components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
