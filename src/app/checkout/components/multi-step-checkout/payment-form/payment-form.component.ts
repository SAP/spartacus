import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { CheckoutService } from '../../../services';

@Component({
  selector: 'y-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentFormComponent implements OnInit {
  cardTypes$: Observable<any>;

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    protected service: CheckoutService
  ) {}

  ngOnInit() {
    this.cardTypes$ = this.store.select(fromCheckoutStore.getAllCardTypes).pipe(
      tap(cardTypes => {
        if (Object.keys(cardTypes).length === 0) {
          this.service.loadSupportedCardTypes();
        }
      })
    );
  }

  back() {}

  next() {}
}
