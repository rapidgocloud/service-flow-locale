
import { User, Service, Order, SupportTicket, Invoice } from '@/config/database';

// Mock data for development - replace with actual API calls in production
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password_123',
    role: 'admin',
    language: 'en',
    phone: '+1234567890',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip_code: '10001',
    country: 'USA',
    status: 'active',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'hashed_password_456',
    role: 'customer',
    language: 'es',
    phone: '+1234567891',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zip_code: '90210',
    country: 'USA',
    status: 'active',
    created_at: new Date('2024-01-02'),
    updated_at: new Date('2024-01-02')
  }
];

const mockServices: Service[] = [
  {
    id: 1,
    name: 'Web Hosting',
    description: 'Reliable web hosting service',
    category: 'hosting',
    price: 9.99,
    billing_cycle: 'monthly',
    features: ['99.9% Uptime', '24/7 Support', 'Free SSL'],
    status: 'active',
    created_at: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'VPS Server',
    description: 'Virtual private server hosting',
    category: 'vps',
    price: 29.99,
    billing_cycle: 'monthly',
    features: ['Full Root Access', 'SSD Storage', 'Scalable'],
    status: 'active',
    created_at: new Date('2024-01-01')
  }
];

const mockOrders: Order[] = [
  {
    id: 1,
    user_id: 2,
    service_id: 1,
    status: 'active',
    amount: 9.99,
    billing_cycle: 'monthly',
    created_at: new Date('2024-01-15'),
    expires_at: new Date('2024-02-15')
  }
];

const mockSupportTickets: SupportTicket[] = [
  {
    id: 1,
    user_id: 2,
    subject: 'Website down',
    message: 'My website is not loading properly',
    status: 'open',
    priority: 'high',
    category: 'technical',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-10')
  }
];

class DatabaseService {
  async testConnection(): Promise<{ success: boolean; message: string }> {
    // Simulate connection test
    return { success: true, message: 'Mock database connection successful' };
  }

  // User methods
  async getAllUsers(): Promise<User[]> {
    return Promise.resolve([...mockUsers]);
  }

  async getUserById(id: number): Promise<User | null> {
    const user = mockUsers.find(u => u.id === id);
    return Promise.resolve(user || null);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = mockUsers.find(u => u.email === email);
    return Promise.resolve(user || null);
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: mockUsers.length + 1,
      created_at: new Date(),
      updated_at: new Date()
    };
    mockUsers.push(newUser);
    return Promise.resolve(newUser);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
      updated_at: new Date()
    };
    
    return Promise.resolve(mockUsers[userIndex]);
  }

  async deleteUser(id: number): Promise<boolean> {
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return Promise.resolve(false);
    }
    
    mockUsers.splice(userIndex, 1);
    return Promise.resolve(true);
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Promise.resolve([...mockServices]);
  }

  async createService(serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> {
    const newService: Service = {
      ...serviceData,
      id: mockServices.length + 1,
      created_at: new Date()
    };
    mockServices.push(newService);
    return Promise.resolve(newService);
  }

  // Order methods
  async getAllOrders(): Promise<Order[]> {
    return Promise.resolve([...mockOrders]);
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const userOrders = mockOrders.filter(o => o.user_id === userId);
    return Promise.resolve(userOrders);
  }

  async createOrder(orderData: { user_id: number; service_id: number; amount: number }): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: mockOrders.length + 1,
      status: 'pending',
      billing_cycle: 'monthly',
      created_at: new Date(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
    mockOrders.push(newOrder);
    return Promise.resolve(newOrder);
  }

  // Support ticket methods
  async getAllSupportTickets(): Promise<SupportTicket[]> {
    return Promise.resolve([...mockSupportTickets]);
  }

  async getUserSupportTickets(userId: number): Promise<SupportTicket[]> {
    const userTickets = mockSupportTickets.filter(t => t.user_id === userId);
    return Promise.resolve(userTickets);
  }

  async createSupportTicket(ticketData: {
    user_id: number;
    subject: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }): Promise<SupportTicket> {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: mockSupportTickets.length + 1,
      status: 'open',
      created_at: new Date(),
      updated_at: new Date()
    };
    mockSupportTickets.push(newTicket);
    return Promise.resolve(newTicket);
  }

  async close(): Promise<void> {
    // No cleanup needed for mock data
    return Promise.resolve();
  }
}

export const databaseService = new DatabaseService();
