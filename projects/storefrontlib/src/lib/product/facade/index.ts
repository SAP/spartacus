import { ProductService } from './product.service';
import { ProductSearchService } from './product-search.service';
import { ProductReviewService } from './product-review.service';

export const services: any[] = [
  ProductService,
  ProductSearchService,
  ProductReviewService
];

export * from './product.service';
export * from './product-search.service';
export * from './product-review.service';
