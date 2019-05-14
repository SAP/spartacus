import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../model/product.model';

@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  transform(product: Product): Product {
    const productClone = Object.assign({}, product);
    productClone.name = product.name.replace(/<[^>]*>/g, '');

    return productClone;
  }
}
