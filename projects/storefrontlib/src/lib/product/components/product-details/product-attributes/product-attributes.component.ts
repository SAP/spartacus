import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss']
})
export class ProductAttributesComponent {
  @Input()
  product: any;
}
