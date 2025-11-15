import { Alert as AlertType } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, XCircle, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AlertPanelProps {
  alerts: AlertType[];
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  const getIcon = (type: AlertType['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
    }
  };

  const getVariant = (type: AlertType['type']) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getBadgeColor = (type: AlertType['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'info':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getGradient = (type: AlertType['type']) => {
    switch (type) {
      case 'critical':
        return 'from-red-600/20 to-red-800/20';
      case 'warning':
        return 'from-yellow-600/20 to-yellow-800/20';
      case 'info':
        return 'from-blue-600/20 to-blue-800/20';
    }
  };

  return (
    <Card className="glass-card rounded-3xl overflow-hidden border-white/10">
      <CardHeader className="relative pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-4 text-white">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold">System Alerts</h3>
              <p className="text-sm font-normal text-slate-400 flex items-center gap-2 mt-1">
                <Zap className="h-3 w-3 text-yellow-400" />
                Real-time anomaly detection
              </p>
            </div>
          </CardTitle>
          <Badge variant="outline" className="bg-slate-800/50 border-white/10 text-white px-4 py-2 text-sm font-semibold">
            {alerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-500/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <TrendingUp className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
            <p className="text-white font-bold text-xl mb-2">All Systems Operational</p>
            <p className="text-sm text-slate-400">No anomalies detected at this time</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={alert.id}
              className="animate-slide-up-fade"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Alert variant={getVariant(alert.type)} className={`neuro-card rounded-2xl bg-gradient-to-br ${getGradient(alert.type)} border-white/10 hover:scale-[1.02] transition-transform duration-300`}>
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 ${
                    alert.type === 'critical' ? 'bg-red-500/20' :
                    alert.type === 'warning' ? 'bg-yellow-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {getIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTitle className="text-white font-bold text-lg">{alert.metric}</AlertTitle>
                      <Badge variant="outline" className={`text-xs font-semibold ${getBadgeColor(alert.type)}`}>
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    <AlertDescription className="text-slate-300 mb-3 leading-relaxed">
                      {alert.message}
                    </AlertDescription>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse" />
                      {alert.timestamp}
                    </div>
                  </div>
                </div>
              </Alert>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}