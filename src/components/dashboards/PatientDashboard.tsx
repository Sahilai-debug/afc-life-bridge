'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Phone, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.fullName}!</h1>
        <p className="text-gray-600">Manage your appointments and health information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Book Appointment
            </CardTitle>
            <CardDescription>
              Schedule a new appointment with our doctors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/patient/book-appointment">
              <Button className="w-full">
                Book Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              View Calendar
            </CardTitle>
            <CardDescription>
              See all your upcoming appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/patient/calendar">
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard/patient/settings">
              <Button variant="outline" className="w-full">
                Manage Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Upcoming Appointments</span>
              <span className="font-semibold">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Appointment</span>
              <span className="font-semibold">May 15, 2024</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Booking</CardTitle>
            <CardDescription>
              Get a callback from our AI assistant to book your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Prefer to speak with someone? Our AI assistant can call you to help schedule your appointment.
              </p>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Request AI Callback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
