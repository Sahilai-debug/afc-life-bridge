
import React from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { LoginForm } from '@/components/forms/LoginForm';
import Link from 'next/link';

export default function PatientAuth() {
  return (
    <Layout>
      <Container className="flex items-center justify-center min-h-screen py-12">
        <div className="w-full max-w-md space-y-6">
          <LoginForm role="patient" />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
