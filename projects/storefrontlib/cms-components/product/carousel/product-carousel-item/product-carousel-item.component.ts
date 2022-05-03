import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ProductListItemContext, ProductListItemContextSource } from '../../product-list';

@Component({
  selector: 'cx-product-carousel-item',
  templateUrl: './product-carousel-item.component.html',
  providers: [
    ProductListItemContextSource,
    {
      provide: ProductListItemContext,
      useExisting: ProductListItemContextSource,
    },
  ],
})
export class ProductCarouselItemComponent implements OnChanges {
  @Input() item: any;

  constructor(
    protected productListItemContextSource: ProductListItemContextSource
  ) {}

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.item) {
      this.productListItemContextSource.product$.next(this.item);
    }
  }
}
