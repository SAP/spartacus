import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'projects/backend/occ-client/lib/models';
import { ProductURLPathService } from './productURL-path.service';

@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {
  constructor(private productURLService: ProductURLPathService) {}

  transform(item: Product): String {
    return this.productURLService.transform(item);
  }
}