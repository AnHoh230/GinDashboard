export interface Gin {
    id: string;
    name: string;
    distillery: string;
    country: string;
    alcoholContent: number;
    volume: number;
    price: number;
    purchaseDate: Date;
    description?: string;
    imageUrl?: string;
  }