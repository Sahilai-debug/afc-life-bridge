
'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Calendar, Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleNavigation = () => {
    switch (user.role) {
      case 'patient':
        return (
          <>
            <Link to="/dashboard/patient">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard/patient/calendar">
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
            </Link>
            <Link to="/dashboard/patient/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </>
        );
      case 'doctor':
        return (
          <>
            <Link to="/dashboard/doctor">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard/doctor/calendar">
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
            </Link>
            <Link to="/dashboard/doctor/patients">
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Patients
              </Button>
            </Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Link to="/dashboard/admin">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard/admin/users">
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
            </Link>
            <Link to="/dashboard/admin/appointments">
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </Button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-blue-600">
              AFC Massachusetts
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              {getRoleNavigation()}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.fullName}
            </span>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
