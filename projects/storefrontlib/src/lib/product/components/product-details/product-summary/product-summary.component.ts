import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  @Input()
  product: any;
  itemCount = 1;

  updateCount(value) {
    this.itemCount = value;
  }
}
