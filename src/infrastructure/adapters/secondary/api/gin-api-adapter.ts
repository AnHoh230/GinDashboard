import { GinRepository } from '../../../../domain/ports/secondary/gin-repository';
import { StatisticsRepository } from '../../../../domain/ports/secondary/statistics-repository';
import { Gin } from '../../../../domain/models/gin';
import { PurchaseStatistics } from '../../../../domain/models/statistics';

export class GinApiAdapter implements GinRepository, StatisticsRepository {
  private readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  async findAll(): Promise<Gin[]> {
    const response = await fetch(`${this.API_BASE_URL}/gins`);
    if (!response.ok) {
      throw new Error('Failed to fetch gins');
    }
    return response.json();
  }

  async findById(id: string): Promise<Gin | null> {
    const response = await fetch(`${this.API_BASE_URL}/gins/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch gin with id ${id}`);
    }
    return response.json();
  }

  async save(gin: Omit<Gin, 'id'>): Promise<Gin> {
    const response = await fetch(`${this.API_BASE_URL}/gins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gin),
    });
    if (!response.ok) {
      throw new Error('Failed to save gin');
    }
    return response.json();
  }

  async update(id: string, gin: Partial<Gin>): Promise<Gin> {
    const response = await fetch(`${this.API_BASE_URL}/gins/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gin),
    });
    if (!response.ok) {
      throw new Error(`Failed to update gin with id ${id}`);
    }
    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.API_BASE_URL}/gins/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete gin with id ${id}`);
    }
  }

  async getPurchaseStatistics(): Promise<PurchaseStatistics> {
    const response = await fetch(`${this.API_BASE_URL}/statistics/purchases`);
    if (!response.ok) {
      throw new Error('Failed to fetch purchase statistics');
    }
    return response.json();
  }

  async getMonthlyTrends(): Promise<PurchaseStatistics['monthlyTrend']> {
    const response = await fetch(`${this.API_BASE_URL}/statistics/trends`);
    if (!response.ok) {
      throw new Error('Failed to fetch monthly trends');
    }
    return response.json();
  }
}