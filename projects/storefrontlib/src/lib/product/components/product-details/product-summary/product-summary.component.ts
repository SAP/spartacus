import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  static outlets = ProductDetailOutlets;

  @Input()
  product: any;
  itemCount = 1;

  get outlets() {
    return ProductSummaryComponent.outlets;
  }

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
}
