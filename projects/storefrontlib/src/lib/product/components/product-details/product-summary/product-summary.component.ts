import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { ProductSummaryOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent implements OnInit {
  static outlets = ProductSummaryOutlets;

  @Input()
  product: any;
  itemCount = 1;
  stockInfo = '';

  ngOnInit() {
    this.stockInfo =
      this.product &&
      this.product.stock &&
      (this.product.stock.stockLevel > 0 ||
        this.product.stock.stockLevelStatus === 'inStock')
        ? `${this.product.stock.stockLevel} in stock`
        : 'Out of stock';
  }

  get outlets() {
    return ProductSummaryComponent.outlets;
  }

  updateCount(value) {
    this.itemCount = value;
  }
}
