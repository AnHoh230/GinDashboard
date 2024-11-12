import { Gin } from '../../../../domain/models/gin';
import { PurchaseStatistics, MonthlyTrend } from '../../../../domain/models/statistics';
import { GinRepository } from '../../../../domain/ports/secondary/gin-repository';
import { StatisticsRepository } from '../../../../domain/ports/secondary/statistics-repository';

const MOCK_MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: 'Jan', purchases: 2, totalSpent: 65.98, trend: 0 },
  { month: 'Feb', purchases: 3, totalSpent: 89.97, trend: 15 },
  { month: 'Mär', purchases: 4, totalSpent: 125.96, trend: 20 },
  { month: 'Apr', purchases: 2, totalSpent: 71.98, trend: -10 }
];

const MOCK_GINS: Gin[] = [
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
  // ... andere Gins
];

export class MockGinApiAdapter implements GinRepository, StatisticsRepository {
  // GinRepository Implementation
  async findAll(): Promise<Gin[]> {
    return MOCK_GINS;
  }

  async findById(id: string): Promise<Gin | null> {
    return MOCK_GINS.find(g => g.id === id) || null;
  }

  async save(gin: Omit<Gin, 'id'>): Promise<Gin> {
    const newGin = {
      ...gin,
      id: Math.random().toString(36).slice(2, 9)
    };
    MOCK_GINS.push(newGin);
    return newGin;
  }

  async update(id: string, gin: Partial<Gin>): Promise<Gin> {
    const index = MOCK_GINS.findIndex(g => g.id === id);
    if (index === -1) throw new Error(`Gin with id ${id} not found`);
    
    MOCK_GINS[index] = { ...MOCK_GINS[index], ...gin };
    return MOCK_GINS[index];
  }

  async delete(id: string): Promise<void> {
    const index = MOCK_GINS.findIndex(g => g.id === id);
    if (index !== -1) MOCK_GINS.splice(index, 1);
  }

  // StatisticsRepository Implementation
  async getPurchaseStatistics(): Promise<PurchaseStatistics> {
    return {
      totalBottles: MOCK_GINS.length,
      totalValue: MOCK_GINS.reduce((sum, gin) => sum + gin.price, 0),
      averagePrice: MOCK_GINS.reduce((sum, gin) => sum + gin.price, 0) / MOCK_GINS.length,
      purchasesLastWeek: 2,
      monthlyTrend: MOCK_MONTHLY_TRENDS
    };
  }

  async getMonthlyTrends(): Promise<MonthlyTrend[]> {
    return MOCK_MONTHLY_TRENDS;
  }
}