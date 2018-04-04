import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { take, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromCheckoutStore from '../../store';
import { CheckoutService } from '../../services/checkout.service';
import * as fromRouting from '../../../routing/store';

@Component({
  selector: 'y-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationComponent implements OnInit {
  order: any;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order = this.checkoutService.orderDetails;
  }
}
