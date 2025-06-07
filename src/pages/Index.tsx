'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, Container } from '@/components/ui/layout';
import { User, Stethoscope, Shield, Heart, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <Container className="py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                AFC Massachusetts
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Comprehensive Adult Foster Care Services
              </p>
              <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto">
                Providing quality healthcare and support services for adults in Massachusetts. 
                Connect with healthcare providers, manage appointments, and access care coordination services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Link to="/auth/patient">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="text-center">
                      <User className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                      <CardTitle className="text-gray-900">Patient Portal</CardTitle>
                      <CardDescription>
                        Book appointments, view your calendar, and manage your health information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Patient Login
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/auth/doctor">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="text-center">
                      <Stethoscope className="w-12 h-12 mx-auto text-green-600 mb-4" />
                      <CardTitle className="text-gray-900">Doctor Portal</CardTitle>
                      <CardDescription>
                        Manage your schedule, view patient information, and coordinate care
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Doctor Login
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/auth/admin">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="text-center">
                      <Shield className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                      <CardTitle className="text-gray-900">Admin Portal</CardTitle>
                      <CardDescription>
                        System administration, user management, and oversight tools
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Admin Login
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </Container>
        </div>

        {/* Features Section */}
        <Container className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AFC Massachusetts?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive adult foster care services with modern technology and compassionate care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="w-16 h-16 mx-auto text-red-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Compassionate Care</h3>
              <p className="text-gray-600">
                Our dedicated team provides personalized care with empathy and professional expertise
              </p>
            </div>

            <div className="text-center">
              <Clock className="w-16 h-16 mx-auto text-blue-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock availability for emergency situations and ongoing care coordination
              </p>
            </div>

            <div className="text-center">
              <Users className="w-16 h-16 mx-auto text-green-500 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Licensed healthcare professionals committed to delivering quality adult foster care services
              </p>
            </div>
          </div>
        </Container>

        {/* CTA Section */}
        <div className="bg-gray-50">
          <Container className="py-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                New to AFC Massachusetts? Register as a patient to begin your care journey
              </p>
              <Link to="/auth/register">
                <Button size="lg" className="text-lg px-8 py-3">
                  Register as Patient
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
