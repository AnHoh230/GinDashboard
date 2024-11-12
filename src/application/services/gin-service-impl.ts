import { GinService } from '../../domain/ports/primary/gin-service';
import { GinRepository } from '../../domain/ports/secondary/gin-repository';
import { StatisticsRepository } from '../../domain/ports/secondary/statistics-repository';
import { Gin } from '../../domain/models/gin';
import { PurchaseStatistics } from '../../domain/models/statistics';

export class GinServiceImpl implements GinService {
  constructor(
    private readonly ginRepository: GinRepository,
    private readonly statisticsRepository: StatisticsRepository
  ) {}

  async getAllGins(): Promise<Gin[]> {
    return this.ginRepository.findAll();
  }

  async getGinById(id: string): Promise<Gin> {
    const gin = await this.ginRepository.findById(id);
    if (!gin) {
      throw new Error(`Gin with id ${id} not found`);
    }
    return gin;
  }

  async getPurchaseStatistics(): Promise<PurchaseStatistics> {
    return this.statisticsRepository.getPurchaseStatistics();
  }

  async addGin(gin: Omit<Gin, 'id'>): Promise<Gin> {
    return this.ginRepository.save(gin);
  }

  async updateGin(id: string, gin: Partial<Gin>): Promise<Gin> {
    return this.ginRepository.update(id, gin);
  }

  async deleteGin(id: string): Promise<void> {
    await this.ginRepository.delete(id);
  }
}