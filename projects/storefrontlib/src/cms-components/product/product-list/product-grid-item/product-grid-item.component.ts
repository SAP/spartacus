import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductListOutlets } from '../../product-outlets.model';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGridItemComponent {
  readonly Outlets = ProductListOutlets;
  @Input() product: any;
}
