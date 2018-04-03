import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Address } from '../../../models/address-model';

@Component({
  selector: 'y-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderReviewComponent {
  @Input() deliveryAddress: Address;
  @Input() deliveryMode;
  @Input() paymentDetails;

  @Output() backStep = new EventEmitter<any>();

  constructor() {}
}
