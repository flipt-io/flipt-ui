import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthProvider from '~/components/AuthProvider';
import { useAuth } from '~/data/hooks/auth';
import ErrorNotification from '../components/ErrorNotification';
import { ErrorProvider } from '../components/ErrorProvider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function InnerLayout() {
  const { session } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('session', session);
  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <>
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
    </>
  );
}

export default function Layout() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <InnerLayout />
        <ErrorNotification />
      </AuthProvider>
    </ErrorProvider>
  );
}
