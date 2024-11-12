import { useState, useEffect, useMemo } from 'react';
import { Gin } from '../../domain/models/gin';
import { PurchaseStatistics } from '../../domain/models/statistics';
import { GinService } from '../../domain/ports/primary/gin-service';
import { GinServiceImpl } from '../../application/services/gin-service-impl';
import { GinApiAdapter } from '../../infrastructure/adapters/secondary/api/gin-api-adapter';

export const useGinDashboard = (
    serviceFactory: () => GinService = () => {
      const apiAdapter = new GinApiAdapter();
      return new GinServiceImpl(apiAdapter, apiAdapter);
    }
  ) => {
    const [gins, setGins] = useState<Gin[]>([]);
    const [statistics, setStatistics] = useState<PurchaseStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    const ginService = useMemo(() => serviceFactory(), [serviceFactory]);
  
    useEffect(() => {
      const loadDashboardData = async () => {
        try {
          setLoading(true);
          const [ginsData, statsData] = await Promise.all([
            ginService.getAllGins(),
            ginService.getPurchaseStatistics(),
          ]);
          setGins(ginsData);
          setStatistics(statsData);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        } finally {
          setLoading(false);
        }
      };
  
      loadDashboardData();
    }, [ginService]);

  const addGin = async (gin: Omit<Gin, 'id'>) => {
    try {
      const newGin = await ginService.addGin(gin);
      setGins(prevGins => [...prevGins, newGin]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add gin'));
      throw err;
    }
  };

  const updateGin = async (id: string, gin: Partial<Gin>) => {
    try {
      const updatedGin = await ginService.updateGin(id, gin);
      setGins(prevGins => 
        prevGins.map(g => g.id === id ? updatedGin : g)
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update gin'));
      throw err;
    }
  };

  const deleteGin = async (id: string) => {
    try {
      await ginService.deleteGin(id);
      setGins(prevGins => prevGins.filter(g => g.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete gin'));
      throw err;
    }
  };

  return {
    gins,
    statistics,
    loading,
    error,
    actions: {
      addGin,
      updateGin,
      deleteGin,
    },
  };
};