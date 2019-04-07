import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-product-list-item',
  templateUrl: './product-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItemComponent {
  @Input() product: Product;
}
