
import { DATABASE_CONFIG, User, Service, Order, SupportTicket, Invoice } from '@/config/database';

// Enhanced API service with better error handling and logging
class ApiService {
  private baseUrl = '/api';

  // Helper method for logging
  private log(message: string, data?: any) {
    console.log(`[API Service] ${message}`, data || '');
  }

  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    this.log('Attempting login', { email });
    
    // Demo credentials check
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
      this.log('Admin login successful', { userId: user.id });
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
      this.log('Customer login successful', { userId: user.id });
      return { user, token: 'demo-customer-token' };
    }
    
    throw new Error('Invalid credentials');
  }

  async register(userData: { name: string; email: string; password: string; phone?: string; address?: string; city?: string; state?: string; zipCode?: string; country?: string }): Promise<{ user: User; token: string }> {
    this.log('Registering user', { email: userData.email });
    
    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: userData.name,
      email: userData.email,
      role: 'customer',
      language: 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.log('User registration successful', { userId: newUser.id });
    return {
      user: newUser,
      token: 'demo-token-' + newUser.id
    };
  }

  // Services
  async getServices(): Promise<Service[]> {
    this.log('Fetching services');
    
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
      },
      {
        id: 3,
        name: 'Dedicated Server Pro',
        category: 'dedicated',
        price: 199.99,
        billing_cycle: 'monthly',
        features: ['8 CPU Cores', '32GB RAM', '1TB SSD', 'Full Control'],
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Cybersecurity Basic',
        category: 'cybersecurity',
        price: 19.99,
        billing_cycle: 'monthly',
        features: ['Malware Protection', '24/7 Monitoring', 'Firewall', 'Threat Detection'],
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 5,
        name: 'Cloud Backup Pro',
        category: 'hosting',
        price: 14.99,
        billing_cycle: 'monthly',
        features: ['100GB Storage', 'Auto Backup', 'File Versioning', 'Encryption'],
        status: 'draft',
        created_at: new Date().toISOString()
      }
    ];
  }

  async createService(serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> {
    this.log('Creating service', serviceData);
    
    const newService: Service = {
      id: Math.floor(Math.random() * 1000) + 100,
      ...serviceData,
      created_at: new Date().toISOString()
    };
    
    this.log('Service created successfully', { serviceId: newService.id });
    return newService;
  }

  // Orders
  async getUserOrders(userId: number): Promise<Order[]> {
    this.log('Fetching user orders', { userId });
    
    return [
      {
        id: 1,
        user_id: userId,
        service_id: 1,
        status: 'active',
        amount: 9.99,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        user_id: userId,
        service_id: 2,
        status: 'pending',
        amount: 29.99,
        expires_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  async getAllOrders(): Promise<Order[]> {
    this.log('Fetching all orders (admin)');
    
    return [
      {
        id: 1,
        user_id: 2,
        service_id: 1,
        status: 'active',
        amount: 9.99,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        user_id: 3,
        service_id: 2,
        status: 'pending',
        amount: 29.99,
        expires_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        user_id: 4,
        service_id: 3,
        status: 'suspended',
        amount: 199.99,
        expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      }
    ];
  }

  async createOrder(orderData: { user_id: number; service_id: number; amount: number }): Promise<Order> {
    this.log('Creating order', orderData);
    
    const newOrder: Order = {
      id: Math.floor(Math.random() * 1000) + 100,
      user_id: orderData.user_id,
      service_id: orderData.service_id,
      status: 'pending',
      amount: orderData.amount,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };
    
    this.log('Order created successfully', { orderId: newOrder.id });
    return newOrder;
  }

  // Support Tickets
  async getSupportTickets(userId?: number): Promise<SupportTicket[]> {
    this.log('Fetching support tickets', { userId });
    
    const tickets: SupportTicket[] = [
      {
        id: 1,
        user_id: userId || 2,
        subject: 'Server Performance Issue',
        message: 'My website has been loading slowly recently. Can you help?',
        priority: 'medium',
        status: 'open',
        category: 'technical',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        user_id: userId || 3,
        subject: 'Billing Question',
        message: 'I have a question about my last invoice.',
        priority: 'low',
        status: 'resolved',
        category: 'billing',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        user_id: userId || 4,
        subject: 'SSL Certificate Issue',
        message: 'My SSL certificate expired and I need help renewing it.',
        priority: 'high',
        status: 'in_progress',
        category: 'technical',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    return userId ? tickets.filter(ticket => ticket.user_id === userId) : tickets;
  }

  async createSupportTicket(ticketData: {
    user_id: number;
    subject: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }): Promise<SupportTicket> {
    this.log('Creating support ticket', ticketData);
    
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
    
    this.log('Support ticket created successfully', { ticketId: newTicket.id });
    return newTicket;
  }

  // Admin functions
  async getAllUsers(): Promise<User[]> {
    this.log('Fetching all users (admin)');
    
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
      },
      {
        id: 3,
        name: 'Maria Garcia',
        email: 'maria@example.com',
        role: 'customer',
        language: 'es',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        name: 'João Silva',
        email: 'joao@example.com',
        role: 'customer',
        language: 'pt',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    this.log('Creating user (admin)', userData);
    
    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 100,
      ...userData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.log('User created successfully', { userId: newUser.id });
    return newUser;
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    this.log('Updating user', { userId, userData });
    
    // Simulate user update
    const updatedUser: User = {
      id: userId,
      name: userData.name || 'Updated User',
      email: userData.email || 'updated@example.com',
      role: userData.role || 'customer',
      language: userData.language || 'en',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.log('User updated successfully', { userId });
    return updatedUser;
  }

  async deleteUser(userId: number): Promise<boolean> {
    this.log('Deleting user', { userId });
    
    // Simulate user deletion
    this.log('User deleted successfully', { userId });
    return true;
  }

  // Database connection test
  async testDatabaseConnection(): Promise<{ success: boolean; message: string }> {
    this.log('Testing database connection', DATABASE_CONFIG);
    
    try {
      // This would be a real database connection test
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Database connection successful'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to database: ' + (error as Error).message
      };
    }
  }
}

export const apiService = new ApiService();
