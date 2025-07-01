
import mysql from 'mysql2/promise';
import { DATABASE_CONFIG, User, Service, Order, SupportTicket, Invoice } from '@/config/database';

class DatabaseService {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: DATABASE_CONFIG.host,
      port: DATABASE_CONFIG.port,
      user: DATABASE_CONFIG.user,
      password: DATABASE_CONFIG.password,
      database: DATABASE_CONFIG.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4'
    });
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      return { success: true, message: 'Database connection successful' };
    } catch (error) {
      console.error('Database connection error:', error);
      return { success: false, message: `Database connection failed: ${(error as Error).message}` };
    }
  }

  // User methods
  async getAllUsers(): Promise<User[]> {
    const [rows] = await this.pool.execute(
      'SELECT id, name, email, role, language, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    return rows as User[];
  }

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const [result] = await this.pool.execute(
      'INSERT INTO users (name, email, password, role, language, phone, address, city, state, zip_code, country, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userData.name, userData.email, 'hashed_password', userData.role || 'customer', userData.language || 'en', '', '', '', '', '', '', 'active']
    );
    const insertResult = result as mysql.ResultSetHeader;
    return this.getUserById(insertResult.insertId) as Promise<User>;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const setClause = Object.keys(userData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(userData);
    
    await this.pool.execute(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id]
    );
    
    return this.getUserById(id) as Promise<User>;
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM services ORDER BY created_at DESC'
    );
    return rows as Service[];
  }

  async createService(serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> {
    const [result] = await this.pool.execute(
      'INSERT INTO services (name, description, category, price, billing_cycle, features, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [serviceData.name, '', serviceData.category, serviceData.price, serviceData.billing_cycle, JSON.stringify(serviceData.features), serviceData.status]
    );
    const insertResult = result as mysql.ResultSetHeader;
    
    const [rows] = await this.pool.execute('SELECT * FROM services WHERE id = ?', [insertResult.insertId]);
    const services = rows as Service[];
    return services[0];
  }

  // Order methods
  async getAllOrders(): Promise<Order[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    return rows as Order[];
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows as Order[];
  }

  async createOrder(orderData: { user_id: number; service_id: number; amount: number }): Promise<Order> {
    const [result] = await this.pool.execute(
      'INSERT INTO orders (user_id, service_id, status, amount, billing_cycle, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
      [orderData.user_id, orderData.service_id, 'pending', orderData.amount, 'monthly', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)]
    );
    const insertResult = result as mysql.ResultSetHeader;
    
    const [rows] = await this.pool.execute('SELECT * FROM orders WHERE id = ?', [insertResult.insertId]);
    const orders = rows as Order[];
    return orders[0];
  }

  // Support ticket methods
  async getAllSupportTickets(): Promise<SupportTicket[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM support_tickets ORDER BY created_at DESC'
    );
    return rows as SupportTicket[];
  }

  async getUserSupportTickets(userId: number): Promise<SupportTicket[]> {
    const [rows] = await this.pool.execute(
      'SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows as SupportTicket[];
  }

  async createSupportTicket(ticketData: {
    user_id: number;
    subject: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }): Promise<SupportTicket> {
    const [result] = await this.pool.execute(
      'INSERT INTO support_tickets (user_id, subject, message, priority, status, category) VALUES (?, ?, ?, ?, ?, ?)',
      [ticketData.user_id, ticketData.subject, ticketData.message, ticketData.priority, 'open', ticketData.category]
    );
    const insertResult = result as mysql.ResultSetHeader;
    
    const [rows] = await this.pool.execute('SELECT * FROM support_tickets WHERE id = ?', [insertResult.insertId]);
    const tickets = rows as SupportTicket[];
    return tickets[0];
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export const databaseService = new DatabaseService();
