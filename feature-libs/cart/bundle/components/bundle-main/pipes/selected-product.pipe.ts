import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@spartacus/core';

@Pipe({
  name: 'isSelected',
})
export class SelectedProductPipe implements PipeTransform {
  transform(value: Product[], product: Product): boolean {
    return Boolean(value?.find((item) => item.code === product.code));
  }
}
