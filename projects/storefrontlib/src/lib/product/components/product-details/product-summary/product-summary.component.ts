import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ProductDetailOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  static outlets = ProductDetailOutlets;

  itemCount = 1;

  @Input() product: any;
  @Output() onOpenReview = new EventEmitter();

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

  openReview() {
    this.onOpenReview.emit();
  }
}
