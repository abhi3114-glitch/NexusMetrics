import { UserRole } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Users, Building2 } from 'lucide-react';

interface RoleSelectorProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function RoleSelector({ role, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">View as:</span>
      <Select value={role} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="developer">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Developer</span>
            </div>
          </SelectItem>
          <SelectItem value="team-lead">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Team Lead</span>
            </div>
          </SelectItem>
          <SelectItem value="manager">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Manager</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}