import { Alert as AlertType } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AlertPanelProps {
  alerts: AlertType[];
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  const getIcon = (type: AlertType['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Anomaly Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No alerts at this time</p>
        ) : (
          alerts.map((alert) => (
            <Alert key={alert.id} variant={getVariant(alert.type)}>
              {getIcon(alert.type)}
              <AlertTitle className="ml-2">{alert.metric}</AlertTitle>
              <AlertDescription className="ml-6">
                {alert.message}
                <span className="block text-xs mt-1 opacity-70">{alert.timestamp}</span>
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
}