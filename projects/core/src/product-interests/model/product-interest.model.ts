import { ImageGroup, Stock, Price } from '../../model';
import { Sort, Pagination } from '../../model/unused.model';

export interface ProductInterestEntry {
  interestType?: string;
  dateAdded?: Date;
}

export interface ProductInterestFutureStock {
  stock?: Stock;
  date?: Date;
  expirationDate?: Date;
}

export interface ProductInterest {
  code?: string;
  name?: string;
  url?: string;
  stock?: Stock;
  futureStocks?: ProductInterestFutureStock[];
  manufacturer?: string;
  price?: Price;
  images?: ImageGroup;
}

export interface ProductInterestRelation {
  product?: ProductInterest;
  productInterestEntry?: ProductInterestEntry[];
}

export interface ProductInterestList {
  results?: ProductInterestRelation[];
  sorts?: Sort[];
  pagination?: Pagination;
}

export enum NotificationType {
  BACK_IN_STOCK = 'BACK_IN_STOCK',
}
