import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'projects/backend/occ-client/lib/models';

import { SemanticPathService } from './semantic-path.service';

import { ProductURLCommand } from './productURL-command';
@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {

  constructor(private semanticPath : SemanticPathService){}
  transform(item: Product){
    return this.semanticPath.transform(new ProductURLCommand("product", item));
  }
}