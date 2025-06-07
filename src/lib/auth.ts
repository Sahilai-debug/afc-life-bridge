
import { User, UserRole } from '@/types';

// Mock authentication service - replace with real backend integration
export class AuthService {
  private static users: User[] = [
    {
      id: '1',
      email: 'patient@afc.com',
      fullName: 'John Patient',
      role: 'patient',
      phone: '(555) 123-4567',
      insuranceNumber: 'INS123456789',
      createdAt: new Date()
    },
    {
      id: '2',
      email: 'doctor@afc.com',
      fullName: 'Dr. Sarah Johnson',
      role: 'doctor',
      medicalLicense: 'MD123456',
      createdAt: new Date()
    },
    {
      id: '3',
      email: 'admin@afc.com',
      fullName: 'Admin User',
      role: 'admin',
      createdAt: new Date()
    }
  ];

  static async login(email: string, password: string): Promise<User | null> {
    // Mock login - replace with real authentication
    const user = this.users.find(u => u.email === email);
    if (user && password === 'password123') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  static async register(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData as User,
      createdAt: new Date()
    };
    this.users.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  }

  static getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  static logout(): void {
    localStorage.removeItem('currentUser');
  }

  static getAllUsers(): User[] {
    return this.users;
  }

  static deleteUser(id: string): void {
    this.users = this.users.filter(u => u.id !== id);
  }
}
