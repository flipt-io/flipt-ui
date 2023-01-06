import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

// const userNavigation = [{ name: "Sign out", href: "#" }];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="flex min-h-screen flex-col md:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex px-6 py-10">
          <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
