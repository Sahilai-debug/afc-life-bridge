
import React from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { DoctorDashboard } from '@/components/dashboards/DoctorDashboard';

export default function DoctorDashboardPage() {
  return (
    <Layout>
      <Container>
        <DoctorDashboard />
      </Container>
    </Layout>
  );
}
