import { Alert as AlertType } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, XCircle, TrendingUp } from 'lucide-react';
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
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'info':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <Card className="border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">System Alerts</h3>
              <p className="text-sm font-normal text-slate-400">Real-time anomaly detection</p>
            </div>
          </CardTitle>
          <Badge variant="outline" className="bg-slate-800/50 border-white/10 text-white">
            {alerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-slate-300 font-medium mb-1">All Systems Operational</p>
            <p className="text-sm text-slate-500">No anomalies detected at this time</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={alert.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Alert variant={getVariant(alert.type)} className="border-white/10 bg-slate-800/50 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    alert.type === 'critical' ? 'bg-red-500/20' :
                    alert.type === 'warning' ? 'bg-yellow-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {getIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTitle className="text-white font-semibold">{alert.metric}</AlertTitle>
                      <Badge variant="outline" className={`text-xs ${getBadgeColor(alert.type)}`}>
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    <AlertDescription className="text-slate-300 mb-2">
                      {alert.message}
                    </AlertDescription>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                        {alert.timestamp}
                      </span>
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