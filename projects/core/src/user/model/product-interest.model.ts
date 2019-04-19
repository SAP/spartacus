import { Price, Stock, Image, Sort, SortModel, Pagination } from '../../occ/index';

export interface ProductInterestEntry {
    interestType?: string;
    dateAdded?: Date;
}

export interface ProductInterestFutureStock {
    stock?: Stock;
    date?: Date;
}

export interface ProductInterest {
    code?: string;
    name?: string;
    url?: string;
    stock?: Stock;
    futureStocks?: ProductInterestFutureStock[];
    manufacturer?: string;
    price?: Price;
    images?: Image;
}

export interface ProductInterestRelation {
    product?: ProductInterest;
    productInterestEntry?: ProductInterestEntry;
}

export interface ProductInterestList {
    results?: ProductInterestRelation;
    sorts?: Sort[];
    pagination?: Pagination;
}
