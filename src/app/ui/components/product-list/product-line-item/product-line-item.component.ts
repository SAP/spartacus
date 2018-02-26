import { Component, Input } from '@angular/core';

@Component({
  selector: 'y-product-line-item',
  templateUrl: './product-line-item.component.html',
  styleUrls: ['./product-line-item.component.scss']
})
export class ProductLineItemComponent {

    @Input() product;

}
