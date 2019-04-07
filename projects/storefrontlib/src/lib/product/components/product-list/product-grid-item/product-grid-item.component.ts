import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridItemComponent {
  @Input() product: Product;
}
