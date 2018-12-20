import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';

import { ProductModuleConfig } from '../../../product-config';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductSummaryComponent {
  static outlets = ProductDetailOutlets;

  itemCount = 1;

  @Input() product: any;
  @Output() openReview = new EventEmitter();

  get outlets() {
    return ProductSummaryComponent.outlets;
  }

  get style() {
    if (
      this.config.product.styles.summary &&
      this.config.product.styles.summary.cssIncludePaths
    ) {
      return this.config.product.styles.summary.cssIncludePaths;
    }
  }

  constructor(private config: ProductModuleConfig) {}

  updateCount(value) {
    this.itemCount = value;
  }

  get stockInfo(): string {
    return this.hasStock()
      ? `${this.product.stock.stockLevel} in stock`
      : 'Out of stock';
  }

  private hasStock(): boolean {
    return (
      this.product &&
      this.product.stock &&
      (this.product.stock.stockLevel > 0 ||
        this.product.stock.stockLevelStatus === 'inStock')
    );
  }

  launchReview() {
    this.openReview.emit();
  }
}
