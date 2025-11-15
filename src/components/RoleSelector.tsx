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
      <span className="text-sm font-medium text-slate-400 hidden sm:block">View as:</span>
      <Select value={role} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <SelectTrigger className="w-[180px] border-white/10 bg-slate-900/50 backdrop-blur-xl text-white hover:bg-slate-800/50 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-slate-900/95 backdrop-blur-xl">
          <SelectItem value="developer" className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <span>Developer</span>
            </div>
          </SelectItem>
          <SelectItem value="team-lead" className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <span>Team Lead</span>
            </div>
          </SelectItem>
          <SelectItem value="manager" className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-pink-400" />
              </div>
              <span>Manager</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}