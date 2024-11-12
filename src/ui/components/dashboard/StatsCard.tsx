import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../common/card/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
}

export const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend !== undefined && (
            <p className="text-sm">
              <span className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
              {' vs. letzter Monat'}
            </p>
          )}
        </div>
        <div className="p-4 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </CardContent>
  </Card>
);