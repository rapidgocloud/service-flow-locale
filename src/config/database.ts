
export const DATABASE_CONFIG = {
  host: '104.156.48.138',
  port: 3306,
  database: 'rapi9977_2025Suc',
  user: 'rapi9977_2025Suc',
  password: 'ylm)wgu-2]Gi8$Uw'
};

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  category: 'hosting' | 'vps' | 'dedicated' | 'cybersecurity';
  price: number;
  billing_cycle: 'monthly' | 'yearly';
  features: string[];
  status: 'active' | 'inactive' | 'draft';
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  service_id: number;
  status: 'pending' | 'active' | 'suspended' | 'cancelled';
  amount: number;
  expires_at: string;
  created_at: string;
}

export interface SupportTicket {
  id: number;
  user_id: number;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  user_id: number;
  order_id: number;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  paid_at: string | null;
  created_at: string;
}
