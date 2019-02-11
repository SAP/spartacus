import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '@spartacus/core';

@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  transform(product: Product): Product {
    const productClone = Object.assign({}, product);
    productClone.name = product.name.replace(/<[^>]*>/g, '');

    return productClone;
  }
}
