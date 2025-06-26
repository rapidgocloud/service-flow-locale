
import { DATABASE_CONFIG, User, Service, Order, SupportTicket, Invoice } from '@/config/database';

// Since we can't directly connect to MySQL from frontend, we'll create API functions
// that would typically call backend endpoints. For now, we'll simulate the API calls.

class ApiService {
  private baseUrl = '/api'; // This would be your actual API endpoint

  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    console.log('API: Attempting login for:', email);
    
    // Demo credentials check (in real implementation, this would be a backend call)
    if (email === 'admin@demo.com' && password === 'admin123') {
      return {
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@demo.com',
          role: 'admin',
          language: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        token: 'demo-admin-token'
      };
    } else if (email === 'customer@demo.com' && password === 'customer123') {
      return {
        user: {
          id: 2,
          name: 'Customer User',
          email: 'customer@demo.com',
          role: 'customer',
          language: 'en',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        token: 'demo-customer-token'
      };
    }
    
    throw new Error('Invalid credentials');
  }

  async register(userData: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
    console.log('API: Registering user:', userData.email);
    
    // In real implementation, this would create a user in MySQL
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
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

  // Services
  async getServices(): Promise<Service[]> {
    console.log('API: Fetching services from database');
    
    // This would be a real MySQL query: SELECT * FROM services WHERE status = 'active'
    return [
      {
        id: 1,
        name: 'Web Hosting Pro',
        category: 'hosting',
        price: 9.99,
        billing_cycle: 'monthly',
        features: ['10GB Storage', '100GB Bandwidth', 'SSL Certificate'],
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'VPS Standard',
        category: 'vps',
        price: 29.99,
        billing_cycle: 'monthly',
        features: ['2 CPU Cores', '4GB RAM', '50GB SSD'],
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Dedicated Server Pro',
        category: 'dedicated',
        price: 199.99,
        billing_cycle: 'monthly',
        features: ['8 CPU Cores', '32GB RAM', '1TB SSD'],
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Cybersecurity Basic',
        category: 'cybersecurity',
        price: 19.99,
        billing_cycle: 'monthly',
        features: ['Malware Protection', '24/7 Monitoring', 'Firewall'],
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];
  }

  // Orders
  async getUserOrders(userId: number): Promise<Order[]> {
    console.log('API: Fetching orders for user:', userId);
    
    // Real query: SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
    return [
      {
        id: 1,
        user_id: userId,
        service_id: 1,
        status: 'active',
        amount: 9.99,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      }
    ];
  }

  async createOrder(orderData: { user_id: number; service_id: number; amount: number }): Promise<Order> {
    console.log('API: Creating order:', orderData);
    
    const newOrder: Order = {
      id: Math.floor(Math.random() * 1000),
      user_id: orderData.user_id,
      service_id: orderData.service_id,
      status: 'pending',
      amount: orderData.amount,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };
    
    return newOrder;
  }

  // Support Tickets
  async getSupportTickets(userId?: number): Promise<SupportTicket[]> {
    console.log('API: Fetching support tickets for user:', userId);
    
    // Real query: SELECT * FROM support_tickets WHERE user_id = ? OR ? IS NULL ORDER BY created_at DESC
    return [
      {
        id: 1,
        user_id: userId || 2,
        subject: 'Server Performance Issue',
        message: 'My website has been loading slowly recently.',
        priority: 'medium',
        status: 'open',
        category: 'technical',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  async createSupportTicket(ticketData: {
    user_id: number;
    subject: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }): Promise<SupportTicket> {
    console.log('API: Creating support ticket:', ticketData);
    
    const newTicket: SupportTicket = {
      id: Math.floor(Math.random() * 1000),
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

  // Admin functions
  async getAllUsers(): Promise<User[]> {
    console.log('API: Fetching all users (admin)');
    
    return [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@demo.com',
        role: 'admin',
        language: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Customer User',
        email: 'customer@demo.com',
        role: 'customer',
        language: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  async getAllOrders(): Promise<Order[]> {
    console.log('API: Fetching all orders (admin)');
    
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
}

export const apiService = new ApiService();
