import { Injectable } from '@angular/core';
import { Product } from 'projects/backend/occ-client/lib/models';

@Injectable({ providedIn: 'root' })
export class ProductURLPathService {
  transform(item: Product): String {
   
    return item.url;
  }
}
