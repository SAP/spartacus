import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductSummaryOutlets } from '../../../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  static outlets = ProductSummaryOutlets;

  @Input()
  product: any;
  itemCount = 1;

  get outlets() {
    return ProductSummaryComponent.outlets;
  }

  updateCount(value) {
    this.itemCount = value;
  }
}
