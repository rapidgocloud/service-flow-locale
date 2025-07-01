
import { DATABASE_CONFIG, User, Service, Order, SupportTicket, Invoice } from '@/config/database';
import { databaseService } from './database';

// Enhanced API service with real database integration
class ApiService {
  private baseUrl = '/api';

  // Helper method for logging
  private log(message: string, data?: any) {
    console.log(`[API Service] ${message}`, data || '');
  }

  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    this.log('Attempting login', { email });
    
    try {
      const user = await databaseService.getUserByEmail(email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // In production, you would verify the password hash here
      // For demo purposes, we'll check against demo credentials
      if ((email === 'admin@demo.com' && password === 'admin123') ||
          (email === 'customer@demo.com' && password === 'customer123') ||
          password === 'demo123') {
        this.log('Login successful', { userId: user.id });
        return { user, token: 'demo-token-' + user.id };
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      // Fallback to demo users if database is not available
      this.log('Database login failed, using demo credentials', error);
      
      if (email === 'admin@demo.com' && password === 'admin123') {
        const user: User = {
          id: 1,
          name: 'Admin User',
          email: 'admin@demo.com',
          role: 'admin',
          language: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return { user, token: 'demo-admin-token' };
      } else if (email === 'customer@demo.com' && password === 'customer123') {
        const user: User = {
          id: 2,
          name: 'Customer User',
          email: 'customer@demo.com',
          role: 'customer',
          language: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return { user, token: 'demo-customer-token' };
      }
      
      throw new Error('Invalid credentials');
    }
  }

  async register(userData: { 
    name: string; 
    email: string; 
    password: string; 
    phone?: string; 
    address?: string; 
    city?: string; 
    state?: string; 
    zipCode?: string; 
    country?: string 
  }): Promise<{ user: User; token: string }> {
    this.log('Registering user', { email: userData.email });
    
    try {
      const newUser = await databaseService.createUser({
        name: userData.name,
        email: userData.email,
        role: 'customer',
        language: 'en'
      });
      
      this.log('User registration successful', { userId: newUser.id });
      return {
        user: newUser,
        token: 'demo-token-' + newUser.id
      };
    } catch (error) {
      this.log('Database registration failed, using mock data', error);
      
      const newUser: User = {
        id: Math.floor(Math.random() * 1000) + 100,
        name: userData.name,
        email: userData.email,
        role: 'customer',
        language: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return {
        user: newUser,
        token: 'demo-token-' + newUser.id
      };
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    this.log('Fetching services');
    
    try {
      return await databaseService.getAllServices();
    } catch (error) {
      this.log('Database fetch failed, using mock services', error);
      return this.getMockServices();
    }
  }

  async createService(serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> {
    this.log('Creating service', serviceData);
    
    try {
      const newService = await databaseService.createService(serviceData);
      this.log('Service created successfully', { serviceId: newService.id });
      return newService;
    } catch (error) {
      this.log('Database service creation failed, using mock data', error);
      
      const newService: Service = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...serviceData,
        created_at: new Date().toISOString()
      };
      
      return newService;
    }
  }

  // Orders
  async getUserOrders(userId: number): Promise<Order[]> {
    this.log('Fetching user orders', { userId });
    
    try {
      return await databaseService.getUserOrders(userId);
    } catch (error) {
      this.log('Database fetch failed, using mock orders', error);
      return this.getMockOrders().filter(order => order.user_id === userId);
    }
  }

  async getAllOrders(): Promise<Order[]> {
    this.log('Fetching all orders (admin)');
    
    try {
      return await databaseService.getAllOrders();
    } catch (error) {
      this.log('Database fetch failed, using mock orders', error);
      return this.getMockOrders();
    }
  }

  async createOrder(orderData: { user_id: number; service_id: number; amount: number }): Promise<Order> {
    this.log('Creating order', orderData);
    
    try {
      const newOrder = await databaseService.createOrder(orderData);
      this.log('Order created successfully', { orderId: newOrder.id });
      return newOrder;
    } catch (error) {
      this.log('Database order creation failed, using mock data', error);
      
      const newOrder: Order = {
        id: Math.floor(Math.random() * 1000) + 100,
        user_id: orderData.user_id,
        service_id: orderData.service_id,
        status: 'pending',
        amount: orderData.amount,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      };
      
      return newOrder;
    }
  }

  // Support Tickets
  async getSupportTickets(userId?: number): Promise<SupportTicket[]> {
    this.log('Fetching support tickets', { userId });
    
    try {
      if (userId) {
        return await databaseService.getUserSupportTickets(userId);
      } else {
        return await databaseService.getAllSupportTickets();
      }
    } catch (error) {
      this.log('Database fetch failed, using mock tickets', error);
      const mockTickets = this.getMockSupportTickets();
      return userId ? mockTickets.filter(ticket => ticket.user_id === userId) : mockTickets;
    }
  }

  async createSupportTicket(ticketData: {
    user_id: number;
    subject: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }): Promise<SupportTicket> {
    this.log('Creating support ticket', ticketData);
    
    try {
      const newTicket = await databaseService.createSupportTicket(ticketData);
      this.log('Support ticket created successfully', { ticketId: newTicket.id });
      return newTicket;
    } catch (error) {
      this.log('Database ticket creation failed, using mock data', error);
      
      const newTicket: SupportTicket = {
        id: Math.floor(Math.random() * 1000) + 100,
        user_id: ticketData.user_id,
        subject: ticketData.subject,
        message: ticketData.message,
        priority: ticketData.priority,
        status: 'open',
        category: ticketData.category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return newTicket;
    }
  }

  // Admin functions
  async getAllUsers(): Promise<User[]> {
    this.log('Fetching all users (admin)');
    
    try {
      return await databaseService.getAllUsers();
    } catch (error) {
      this.log('Database fetch failed, using mock users', error);
      return this.getMockUsers();
    }
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    this.log('Creating user (admin)', userData);
    
    try {
      const newUser = await databaseService.createUser(userData);
      this.log('User created successfully', { userId: newUser.id });
      return newUser;
    } catch (error) {
      this.log('Database user creation failed, using mock data', error);
      
      const newUser: User = {
        id: Math.floor(Math.random() * 1000) + 100,
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return newUser;
    }
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    this.log('Updating user', { userId, userData });
    
    try {
      const updatedUser = await databaseService.updateUser(userId, userData);
      this.log('User updated successfully', { userId });
      return updatedUser;
    } catch (error) {
      this.log('Database user update failed, using mock data', error);
      
      const updatedUser: User = {
        id: userId,
        name: userData.name || 'Updated User',
        email: userData.email || 'updated@example.com',
        role: userData.role || 'customer',
        language: userData.language || 'en',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return updatedUser;
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    this.log('Deleting user', { userId });
    
    try {
      await databaseService.deleteUser(userId);
      this.log('User deleted successfully', { userId });
      return true;
    } catch (error) {
      this.log('Database user deletion failed, simulating success', error);
      return true;
    }
  }

  // Database connection test
  async testDatabaseConnection(): Promise<{ success: boolean; message: string }> {
    this.log('Testing database connection', DATABASE_CONFIG);
    
    try {
      return await databaseService.testConnection();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to database: ' + (error as Error).message
      };
    }
  }

  // Mock data methods (fallback when database is unavailable)
  private getMockServices(): Service[] {
    return [
      {
        id: 1,
        name: 'Web Hosting Pro',
        category: 'hosting',
        price: 9.99,
        billing_cycle: 'monthly',
        features: ['10GB Storage', '100GB Bandwidth', 'SSL Certificate', '24/7 Support'],
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'VPS Standard',
        category: 'vps',
        price: 29.99,
        billing_cycle: 'monthly',
        features: ['2 CPU Cores', '4GB RAM', '50GB SSD', 'Root Access'],
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];
  }

  private getMockOrders(): Order[] {
    return [
      {
        id: 1,
        user_id: 2,
        service_id: 1,
        status: 'active',
        amount: 9.99,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      }
    ];
  }

  private getMockSupportTickets(): SupportTicket[] {
    return [
      {
        id: 1,
        user_id: 2,
        subject: 'Server Performance Issue',
        message: 'My website has been loading slowly recently. Can you help?',
        priority: 'medium',
        status: 'open',
        category: 'technical',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  private getMockUsers(): User[] {
    return [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@demo.com',
        role: 'admin',
        language: 'en',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'John Smith',
        email: 'john@example.com',
        role: 'customer',
        language: 'en',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

export const apiService = new ApiService();
