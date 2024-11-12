import { Gin } from '../../models/gin';
import { PurchaseStatistics } from '../../models/statistics';

export interface GinService {
  getAllGins(): Promise<Gin[]>;
  getGinById(id: string): Promise<Gin>;
  getPurchaseStatistics(): Promise<PurchaseStatistics>;
  addGin(gin: Omit<Gin, 'id'>): Promise<Gin>;
  updateGin(id: string, gin: Partial<Gin>): Promise<Gin>;
  deleteGin(id: string): Promise<void>;
}