
import React from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { PatientDashboard } from '@/components/dashboards/PatientDashboard';

export default function PatientDashboardPage() {
  return (
    <Layout>
      <Container>
        <PatientDashboard />
      </Container>
    </Layout>
  );
}
