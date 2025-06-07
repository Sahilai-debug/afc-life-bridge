
import React from 'react';
import { Layout, Container } from '@/components/ui/layout';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <Layout>
      <Container className="flex items-center justify-center min-h-screen py-12">
        <div className="w-full max-w-md space-y-6">
          <RegisterForm />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/auth/patient" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
