import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../../../occ/occ-models/occ.models';

@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  transform(product: Product): Product {
    const productClone = Object.assign({}, product);
    productClone.name = product.name.replace(/<[^>]*>/g, '');

    return productClone;
  }
}
