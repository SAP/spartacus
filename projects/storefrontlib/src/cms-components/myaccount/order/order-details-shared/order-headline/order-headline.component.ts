import { Component, Input } from '@angular/core';
import { Order } from '@spartacus/core';

@Component({
  selector: 'cx-order-headline',
  templateUrl: './order-headline.component.html',
})
export class OrderHeadlineComponent {
  @Input()
  order: Order;

  constructor() {}
}
