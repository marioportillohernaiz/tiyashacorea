import { WorkComponent } from "@/app/main/workcomponent";
import { Sidebar } from "@/app/main/sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <h1 className="text-4xl sm:text-3xl font-bold tracking-tight block sm:hidden pt-16 mx-auto">TIYASHA COREA</h1>
      <div className="block sm:hidden flex justify-center space-x-6 text-gray-500 p-4">
        <Link href="/about" className="block py-1 hover:text-black">
          About / Contact
        </Link>
      </div>
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 md:ml-64">
        <WorkComponent />
      </main>
    </div>
  );
}
