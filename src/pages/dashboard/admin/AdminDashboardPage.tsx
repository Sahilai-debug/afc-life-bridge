
import React from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';

export default function AdminDashboardPage() {
  return (
    <Layout>
      <Container>
        <AdminDashboard />
      </Container>
    </Layout>
  );
}
