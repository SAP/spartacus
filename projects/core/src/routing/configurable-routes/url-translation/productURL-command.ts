import { UrlCommandRoute } from './url-command';
import { Product } from 'projects/core/src/model/product.model';

export class ProductURLCommand implements UrlCommandRoute {
  cxRoute?: string;
  params?: Product;

  constructor(param: Product) {
    this.cxRoute = 'product';
    this.params = param;
  }
}
