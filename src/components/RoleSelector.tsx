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
      <span className="text-sm font-semibold text-slate-400 hidden sm:block">View as:</span>
      <Select value={role} onValueChange={(value) => onRoleChange(value as UserRole)}>
        <SelectTrigger className="w-[200px] border-white/10 bg-slate-900/50 backdrop-blur-xl text-white hover:bg-slate-800/50 transition-all duration-300 rounded-xl h-11 font-medium shadow-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-slate-900/95 backdrop-blur-2xl rounded-xl shadow-2xl">
          <SelectItem value="developer" className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 cursor-pointer rounded-lg transition-all duration-200">
            <div className="flex items-center gap-3 py-1">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <span className="font-medium">Developer</span>
            </div>
          </SelectItem>
          <SelectItem value="team-lead" className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 cursor-pointer rounded-lg transition-all duration-200">
            <div className="flex items-center gap-3 py-1">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <span className="font-medium">Team Lead</span>
            </div>
          </SelectItem>
          <SelectItem value="manager" className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50 cursor-pointer rounded-lg transition-all duration-200">
            <div className="flex items-center gap-3 py-1">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-pink-500/30 to-pink-600/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Building2 className="h-4 w-4 text-pink-400" />
              </div>
              <span className="font-medium">Manager</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}