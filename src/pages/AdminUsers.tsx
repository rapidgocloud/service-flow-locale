
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Ban, CheckCircle, Eye } from 'lucide-react';
import UserModal from '@/components/modals/UserModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { getTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  joinDate: string;
  services: number;
  totalSpent: string;
}

const AdminUsers = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [userToDelete, setUserToDelete] = useState<User | undefined>();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      status: 'Active',
      joinDate: '2024-01-15',
      services: 2,
      totalSpent: '$119.97'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'Active',
      joinDate: '2024-02-20',
      services: 1,
      totalSpent: '$29.99'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      status: 'Suspended',
      joinDate: '2024-01-08',
      services: 3,
      totalSpent: '$299.97'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      status: 'Active',
      joinDate: '2024-03-10',
      services: 1,
      totalSpent: '$9.99'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleSaveUser = (userData: Omit<User, 'id' | 'joinDate' | 'services' | 'totalSpent'>) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userData }
          : user
      ));
      toast({
        title: "User Updated",
        description: "User information has been updated successfully.",
      });
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        services: 0,
        totalSpent: '$0.00'
      };
      setUsers([...users, newUser]);
      toast({
        title: "User Added",
        description: "New user has been added successfully.",
      });
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully.",
      });
      setUserToDelete(undefined);
      setConfirmModalOpen(false);
    }
  };

  const toggleUserStatus = (user: User) => {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, status: newStatus }
        : u
    ));
    toast({
      title: "Status Changed",
      description: `User status changed to ${newStatus}.`,
    });
  };

  return (
    <DashboardLayout 
      userRole="admin" 
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              {getTranslation(currentLanguage, 'userManagement')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {getTranslation(currentLanguage, 'manageCustomerAccounts')}
            </p>
          </div>
          <Button 
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            onClick={handleAddUser}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {getTranslation(currentLanguage, 'addUser')}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={`${getTranslation(currentLanguage, 'search')} users by name or email...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'totalUsers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'activeUsers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'Active').length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'suspendedUsers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'Suspended').length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'newThisMonth')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-200">
              {getTranslation(currentLanguage, 'user')}s
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              {getTranslation(currentLanguage, 'manageCustomerAccounts')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {getTranslation(currentLanguage, 'user')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {getTranslation(currentLanguage, 'status')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {getTranslation(currentLanguage, 'joinDate')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {getTranslation(currentLanguage, 'services')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {getTranslation(currentLanguage, 'totalSpent')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">
                      {getTranslation(currentLanguage, 'actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">{user.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {getTranslation(currentLanguage, user.status.toLowerCase())}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{user.joinDate}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{user.services}</td>
                      <td className="py-4 px-4 font-medium text-slate-800 dark:text-slate-200">{user.totalSpent}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleUserStatus(user)}
                            className={user.status === 'Active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                          >
                            {user.status === 'Active' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <UserModal
          isOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          onSave={handleSaveUser}
          user={selectedUser}
          language={currentLanguage}
        />

        <ConfirmModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete User"
          message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
          language={currentLanguage}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
