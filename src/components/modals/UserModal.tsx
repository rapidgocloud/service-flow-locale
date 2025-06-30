
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTranslation } from '@/utils/translations';

interface User {
  id?: number;
  name: string;
  email: string;
  status: string;
  joinDate?: string;
  services?: number;
  totalSpent?: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User;
  language: string;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user, language }) => {
  const [formData, setFormData] = useState<User>({
    name: user?.name || '',
    email: user?.email || '',
    status: user?.status || 'Active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? getTranslation(language, 'edit') : getTranslation(language, 'add')} {getTranslation(language, 'user')}</DialogTitle>
          <DialogDescription>
            {user ? 'Edit user information' : 'Add a new user to the system'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">{getTranslation(language, 'status')}</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">{getTranslation(language, 'active')}</SelectItem>
                <SelectItem value="Suspended">{getTranslation(language, 'suspended')}</SelectItem>
                <SelectItem value="Inactive">{getTranslation(language, 'inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {getTranslation(language, 'cancel')}
            </Button>
            <Button type="submit">
              {getTranslation(language, 'save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
