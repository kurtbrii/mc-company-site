import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center text-4xl text-customer_service">
      <p>
        Page Not Found. Go to{" "}
        <Link href="/dashboard" className="text-everyone underline">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
