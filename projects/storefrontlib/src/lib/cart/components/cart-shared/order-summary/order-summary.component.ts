import { Component, Input } from '@angular/core';

@Component({
  selector: 'y-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input()
  cart: any;
}
