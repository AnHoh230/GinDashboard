import React, { useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bottle, TrendingUp, Award, Clock } from 'lucide-react';

// Mock Adapter mit realistischen Daten
class MockGinApiAdapter {
  async fetchPurchasedGins() {
    return [
      {
        id: '1',
        name: 'Monkey 47',
        distillery: 'Black Forest Distillers',
        country: 'Deutschland',
        alcoholContent: 47,
        volume: 500,
        price: 39.99,
        purchaseDate: new Date('2024-03-15'),
        description: 'Schwarzwald Dry Gin mit 47 Botanicals'
      },
      {
        id: '2',
        name: 'Hendricks',
        distillery: 'William Grant & Sons',
        country: 'Schottland',
        alcoholContent: 41.4,
        volume: 700,
        price: 29.99,
        purchaseDate: new Date('2024-03-10'),
        description: 'Premium Gin mit Gurken- und Rosenblütenessenz'
      },
      {
        id: '3',
        name: 'The Botanist',
        distillery: 'Bruichladdich',
        country: 'Schottland',
        alcoholContent: 46,
        volume: 700,
        price: 34.99,
        purchaseDate: new Date('2024-02-28'),
        description: 'Islay Dry Gin mit 22 heimischen Botanicals'
      },
      {
        id: '4',
        name: 'Gin Mare',
        distillery: 'Global Premium Brands',
        country: 'Spanien',
        alcoholContent: 42.7,
        volume: 700,
        price: 36.99,
        purchaseDate: new Date('2024-02-15'),
        description: 'Mediterraner Gin mit Oliven, Rosmarin und Thymian'
      }
    ];
  }

  async fetchPurchaseStatistics() {
    return {
      totalBottles: 4,
      totalValue: 141.96,
      averagePrice: 35.49,
      purchasesLastWeek: 2,
      monthlyTrend: [
        { month: 'Jan', purchases: 2, totalSpent: 65.98, trend: 0 },
        { month: 'Feb', purchases: 3, totalSpent: 89.97, trend: 15 },
        { month: 'Mär', purchases: 4, totalSpent: 125.96, trend: 20 },
        { month: 'Apr', purchases: 2, totalSpent: 71.98, trend: -10 }
      ]
    };
  }
}

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend }: { 
  title: string; 
  value: string | number; 
  icon: any; 
  trend?: number 
}) => (
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

// Main Dashboard Component
const GinDashboardView = () => {
  const createGinService = useCallback(() => {
    const mockAdapter = new MockGinApiAdapter();
    return {
      getAllGins: () => mockAdapter.fetchPurchasedGins(),
      getPurchaseStatistics: () => mockAdapter.fetchPurchaseStatistics(),
      // ... andere Methoden werden für Mock nicht benötigt
    };
  }, []);

  const { gins, statistics, loading, error } = useGinDashboard(createGinService);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4">Error: {error.message}</div>
  );

  if (!statistics) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Gin Kollektion Dashboard</h1>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Gesamte Flaschen"
            value={statistics.totalBottles}
            icon={Bottle}
            trend={15}
          />
          <StatsCard
            title="Gesamtwert"
            value={`${statistics.totalValue.toFixed(2)} €`}
            icon={TrendingUp}
            trend={20}
          />
          <StatsCard
            title="Durchschnittspreis"
            value={`${statistics.averagePrice.toFixed(2)} €`}
            icon={Award}
            trend={-5}
          />
          <StatsCard
            title="Letzte Woche gekauft"
            value={statistics.purchasesLastWeek}
            icon={Clock}
            trend={10}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Kaufentwicklung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statistics.monthlyTrend}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="purchases" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ausgabenübersicht</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statistics.monthlyTrend}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="totalSpent" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gin Collection Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Meine Gin Sammlung</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gins.map((gin) => (
                <div
                  key={gin.id}
                  className="p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer bg-white"
                >
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src="/api/placeholder/120/160"
                      alt={gin.name}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {gin.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>Destillerie: {gin.distillery}</p>
                    <p>Land: {gin.country}</p>
                    <p>Alkoholgehalt: {gin.alcoholContent}%</p>
                    <p>Preis: {gin.price.toFixed(2)} €</p>
                    <p className="text-xs mt-2">{gin.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GinDashboardView;