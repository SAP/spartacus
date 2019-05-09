import { Pipe, PipeTransform } from '@angular/core';
import { UIProduct } from '../../../model/product.model';


@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  transform(product: UIProduct): UIProduct {
    const productClone = Object.assign({}, product);
    productClone.name = product.name.replace(/<[^>]*>/g, '');

    return productClone;
  }
}
