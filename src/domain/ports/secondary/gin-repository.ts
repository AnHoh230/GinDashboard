import { Gin } from '../../models/gin';

export interface GinRepository {
  findAll(): Promise<Gin[]>;
  findById(id: string): Promise<Gin | null>;
  save(gin: Omit<Gin, 'id'>): Promise<Gin>;
  update(id: string, gin: Partial<Gin>): Promise<Gin>;
  delete(id: string): Promise<void>;
}