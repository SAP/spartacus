import { Pipe, PipeTransform } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { ProductURLCommand } from './productURL-command';
import { Product } from '@spartacus/core';
@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {
  constructor(private semanticPath: SemanticPathService) {}
  transform(item: Product) {
    return this.semanticPath.transform(new ProductURLCommand(item));
  }
}
