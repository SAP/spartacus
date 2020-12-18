import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import {
  ProductListItemContext,
  ProductListItemContextOwner,
} from '../../product-list-item-context';
import { ProductListOutlets } from '../../product-outlets.model';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: ProductListItemContext, useClass: ProductListItemContextOwner },
  ],
})
export class ProductGridItemComponent implements OnChanges {
  readonly Outlets = ProductListOutlets;
  @Input() product: any;

  constructor(protected productListItemContext: ProductListItemContext) {}

  ngOnChanges(): void {
    (this.productListItemContext as ProductListItemContextOwner).setProduct(
      this.product
    );
  }
}
