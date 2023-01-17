import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorNotification from '../components/ErrorNotification';
import { ErrorProvider } from '../components/ErrorProvider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// const userNavigation = [{ name: "Sign out", href: "#" }];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ErrorProvider>
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="flex min-h-screen flex-col bg-white md:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex px-6 py-10">
          <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      <ErrorNotification />
    </ErrorProvider>
  );
}
