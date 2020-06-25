import { Component, Input } from '@angular/core';
import { Order } from '@spartacus/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-order-headline',
  templateUrl: './order-headline.component.html',
})
export class OrderHeadlineComponent {
  @Input()
  order: Order;

  constructor() {}
}
