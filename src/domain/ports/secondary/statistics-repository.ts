import { PurchaseStatistics, MonthlyTrend } from '../../models/statistics';

export interface StatisticsRepository {
  getPurchaseStatistics(): Promise<PurchaseStatistics>;
  getMonthlyTrends(): Promise<MonthlyTrend[]>;
}