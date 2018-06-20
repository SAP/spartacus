import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  @Input() product: any;
}
