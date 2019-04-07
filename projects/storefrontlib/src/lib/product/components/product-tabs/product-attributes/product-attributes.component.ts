import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributesComponent {
  @Input() product: Product;
}
