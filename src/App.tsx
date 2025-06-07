
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import PatientAuth from "./pages/auth/PatientAuth";
import DoctorAuth from "./pages/auth/DoctorAuth";
import AdminAuth from "./pages/auth/AdminAuth";
import Register from "./pages/auth/Register";

// Dashboard pages
import PatientDashboardPage from "./pages/dashboard/patient/PatientDashboardPage";
import DoctorDashboardPage from "./pages/dashboard/doctor/DoctorDashboardPage";
import AdminDashboardPage from "./pages/dashboard/admin/AdminDashboardPage";

// Patient pages
import BookAppointment from "./pages/dashboard/patient/BookAppointment";
import PatientCalendar from "./pages/dashboard/patient/PatientCalendar";
import PatientSettings from "./pages/dashboard/patient/PatientSettings";

// Doctor pages
import DoctorCalendar from "./pages/dashboard/doctor/DoctorCalendar";
import DoctorPatients from "./pages/dashboard/doctor/DoctorPatients";

// Admin pages
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminAppointments from "./pages/dashboard/admin/AdminAppointments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Auth Routes */}
              <Route path="/auth/patient" element={<PatientAuth />} />
              <Route path="/auth/doctor" element={<DoctorAuth />} />
              <Route path="/auth/admin" element={<AdminAuth />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Patient Dashboard Routes */}
              <Route path="/dashboard/patient" element={<PatientDashboardPage />} />
              <Route path="/dashboard/patient/book-appointment" element={<BookAppointment />} />
              <Route path="/dashboard/patient/calendar" element={<PatientCalendar />} />
              <Route path="/dashboard/patient/settings" element={<PatientSettings />} />

              {/* Doctor Dashboard Routes */}
              <Route path="/dashboard/doctor" element={<DoctorDashboardPage />} />
              <Route path="/dashboard/doctor/calendar" element={<DoctorCalendar />} />
              <Route path="/dashboard/doctor/patients" element={<DoctorPatients />} />

              {/* Admin Dashboard Routes */}
              <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
              <Route path="/dashboard/admin/users" element={<AdminUsers />} />
              <Route path="/dashboard/admin/appointments" element={<AdminAppointments />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
