import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SuccessNotification from '~/components/SuccessNotification';
import { useSession } from '~/data/hooks/session';
import ErrorNotification from '../components/ErrorNotification';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { NotificationProvider } from '../components/NotificationProvider';
import Sidebar from '../components/Sidebar';

function InnerLayout() {
  const { session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900/50 md:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex px-6 py-10">
          <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function Layout() {
  return (
    <NotificationProvider>
      <InnerLayout />
      <ErrorNotification />
      <SuccessNotification />
    </NotificationProvider>
  );
}
