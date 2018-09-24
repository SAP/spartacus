import { ProductService } from './product.service';
import { ProductSearchService } from './product-search.service';
import { ReviewService } from './review.service';

export const services: any[] = [
  ProductService,
  ProductSearchService,
  ReviewService
];

export * from './product.service';
export * from './product-search.service';
export * from './review.service';
