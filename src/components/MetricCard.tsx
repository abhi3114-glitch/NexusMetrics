import { LucideIcon } from 'lucide-react';
import { ReactNode, memo } from 'react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  trend?: ReactNode;
  gradient: string;
  delay?: number;
}

// Optimized: Memoized to prevent unnecessary re-renders
const MetricCard = memo(function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  gradient,
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className="metric-card-3d group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`relative h-full rounded-2xl p-6 ${gradient} backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
        {/* Animated gradient orb */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="h-14 w-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-7 w-7 text-white" strokeWidth={2} />
            </div>
            {trend && <div className="text-sm font-semibold">{trend}</div>}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/70">{title}</p>
            <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
            <p className="text-xs text-white/50 font-medium">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MetricCard;