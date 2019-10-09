import { Price, Stock } from './product.model';
import { Pagination, Sort } from './unused.model';
import { Images } from './image.model';

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
  images?: Images;
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
