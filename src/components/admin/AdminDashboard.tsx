
import { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminContent } from './AdminContent';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <>
      <AdminSidebar onSectionSelect={setActiveSection} activeSection={activeSection} />
      <AdminContent activeSection={activeSection} />
    </>
  );
}
