
import React from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { LoginForm } from '@/components/forms/LoginForm';

export default function AdminAuth() {
  return (
    <Layout>
      <Container className="flex items-center justify-center min-h-screen py-12">
        <div className="w-full max-w-md">
          <LoginForm role="admin" />
        </div>
      </Container>
    </Layout>
  );
}
