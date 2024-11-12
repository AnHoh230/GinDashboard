export interface MonthlyTrend {
  month: string;
  purchases: number;
  totalSpent: number;
  trend: number;
}

export interface PurchaseStatistics {
  totalBottles: number;
  totalValue: number;
  averagePrice: number;
  purchasesLastWeek: number;
  monthlyTrend: MonthlyTrend[];
}