
import { databaseService } from './database';

// API service that handles all backend communication
class ApiService {
  private baseUrl = '/api'; // This would be your actual API URL in production

  // Authentication
  async login(email: string, password: string) {
    console.log('Login attempt:', { email });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in production, this would validate against your backend
    const user = await databaseService.getUserByEmail(email);
    
    if (user && password === 'password') {
      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            language: user.language
          },
          token: 'mock_jwt_token_' + user.id
        }
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  }

  async register(userData: any) {
    console.log('Registration attempt:', userData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const newUser = await databaseService.createUser({
        ...userData,
        password: 'hashed_password',
        role: 'customer',
        status: 'active'
      });
      
      return {
        success: true,
        data: {
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            language: newUser.language
          },
          token: 'mock_jwt_token_' + newUser.id
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed'
      };
    }
  }

  // Users
  async getUsers() {
    console.log('Fetching users...');
    const users = await databaseService.getAllUsers();
    return {
      success: true,
      data: users
    };
  }

  async createUser(userData: any) {
    console.log('Creating user:', userData);
    try {
      const newUser = await databaseService.createUser(userData);
      return {
        success: true,
        data: newUser
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create user'
      };
    }
  }

  async updateUser(id: number, userData: any) {
    console.log('Updating user:', { id, userData });
    try {
      const updatedUser = await databaseService.updateUser(id, userData);
      return {
        success: true,
        data: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update user'
      };
    }
  }

  async deleteUser(id: number) {
    console.log('Deleting user:', id);
    try {
      await databaseService.deleteUser(id);
      return {
        success: true,
        message: 'User deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete user'
      };
    }
  }

  // Services
  async getServices() {
    console.log('Fetching services...');
    const services = await databaseService.getAllServices();
    return {
      success: true,
      data: services
    };
  }

  async createService(serviceData: any) {
    console.log('Creating service:', serviceData);
    try {
      const newService = await databaseService.createService(serviceData);
      return {
        success: true,
        data: newService
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create service'
      };
    }
  }

  // Orders
  async getOrders() {
    console.log('Fetching orders...');
    const orders = await databaseService.getAllOrders();
    return {
      success: true,
      data: orders
    };
  }

  async getUserOrders(userId: number) {
    console.log('Fetching user orders:', userId);
    const orders = await databaseService.getUserOrders(userId);
    return {
      success: true,
      data: orders
    };
  }

  async createOrder(orderData: any) {
    console.log('Creating order:', orderData);
    try {
      const newOrder = await databaseService.createOrder(orderData);
      return {
        success: true,
        data: newOrder
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create order'
      };
    }
  }

  // Support
  async getSupportTickets() {
    console.log('Fetching support tickets...');
    const tickets = await databaseService.getAllSupportTickets();
    return {
      success: true,
      data: tickets
    };
  }

  async getUserSupportTickets(userId: number) {
    console.log('Fetching user support tickets:', userId);
    const tickets = await databaseService.getUserSupportTickets(userId);
    return {
      success: true,
      data: tickets
    };
  }

  async createSupportTicket(ticketData: any) {
    console.log('Creating support ticket:', ticketData);
    try {
      const newTicket = await databaseService.createSupportTicket(ticketData);
      return {
        success: true,
        data: newTicket
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create support ticket'
      };
    }
  }

  // Payments
  async processPayment(paymentData: any) {
    console.log('Processing payment:', paymentData);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      data: {
        transactionId: 'txn_' + Date.now(),
        status: 'completed',
        amount: paymentData.amount
      }
    };
  }
}

export const apiService = new ApiService();
