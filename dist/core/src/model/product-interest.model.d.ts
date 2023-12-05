import { Product } from './product.model';
import { Pagination, Sort } from './unused.model';
export interface ProductInterestEntry {
    interestType?: NotificationType;
    dateAdded?: string;
    expirationDate?: string;
}
export interface ProductInterestEntryRelation {
    product?: Product;
    productInterestEntry?: ProductInterestEntry[];
}
export interface ProductInterestSearchResult {
    results?: ProductInterestEntryRelation[];
    sorts?: Sort[];
    pagination?: Pagination;
}
export declare enum NotificationType {
    BACK_IN_STOCK = "BACK_IN_STOCK"
}
