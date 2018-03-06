import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-product-line-item',
  templateUrl: './product-line-item.component.html',
  styleUrls: ['./product-line-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductLineItemComponent {
  @Input() product;
}
