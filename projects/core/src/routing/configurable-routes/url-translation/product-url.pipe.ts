import { Pipe, PipeTransform } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { Product } from '../../../model/product.model';
@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {
  constructor(private semanticPath: SemanticPathService) {}
  transform(product: Product) {
    return this.semanticPath.transform({ cxRoute: 'product', params: product });
  }
}
