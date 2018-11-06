import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cx-product-grid-item',
  templateUrl: './product-grid-item.component.html',
  styleUrls: ['./product-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridItemComponent {
  @Input()
  product;
}
