import Sidebar from "../_components/sidebar";

export default function name() {
  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* DASHBOARD - TIME IN/TIME OUT */}
      <div className="flex h-screen w-screen items-center justify-center">
        <p>My Team</p>
      </div>
    </div>
  );
}
