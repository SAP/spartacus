import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Optional,
} from '@angular/core';
import { ProductListOutlets } from '../../product-outlets.model';
import {
  ProductListItemContext,
  ProductListItemContextSource,
} from '../model/product-list-item.context';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ProductGridItemComponent implements OnChanges {
  readonly Outlets = ProductListOutlets;
  @Input() product: any;

  // TODO(#10946): make ProductListItemContextSource a required dependency
  // tslint:disable-next-line: unified-signatures
  constructor(productListItemContextSource: ProductListItemContextSource);
  /**
   * @deprecated since 3.1
   */
  constructor();
  constructor(
    @Optional()
    protected productListItemContextSource?: ProductListItemContextSource
  ) {}

  ngOnChanges(): void {
    this.productListItemContextSource?._product$.next(this.product);
  }
}
