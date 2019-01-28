import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAttributesComponent {
  @Input()
  product: any;
}
