import { ProductImageConverterService } from './product-image-converter.service';
import { ProductReferenceConverterService } from './product-reference-converter.service';

export const services: any[] = [
  ProductImageConverterService,
  ProductReferenceConverterService
];

export * from './product-image-converter.service';
export * from './product-reference-converter.service';
