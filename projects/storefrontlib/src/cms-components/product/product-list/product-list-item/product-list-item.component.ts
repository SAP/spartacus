import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { ProductListOutlets } from '../../product-outlets.model';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';

@Component({
  selector: 'cx-product-list-item',
  templateUrl: './product-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ProductListItemComponent implements OnChanges {
  readonly ProductListOutlets = ProductListOutlets;
  @Input() product: any;

  // TODO(#10946): make ProductListItemContextSource a required dependency
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(productListItemContextSource: ProductListItemContextSource);
  /**
   * @deprecated since 3.1
   */
  constructor();
  constructor(
    @Optional()
    protected productListItemContextSource?: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.product) {
      this.productListItemContextSource?.product$.next(this.product);
    }
  }
}
