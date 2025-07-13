import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title: string;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showFooter = true }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default Layout;