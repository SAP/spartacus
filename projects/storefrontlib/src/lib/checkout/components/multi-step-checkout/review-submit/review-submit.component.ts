import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import * as fromUserStore from '../../../../user/store';
import { CheckoutService } from '../../../services/checkout.service';
import { Address } from '../../../models/address-model';

@Component({
  selector: 'y-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewSubmitComponent implements OnInit {
  @Input() deliveryAddress: Address;
  @Input() paymentDetails: any;
  tAndCToggler = false;

  @Output() backStep = new EventEmitter<any>();
  @Output() placeOrder = new EventEmitter<any>();

  deliveryMode$: Observable<any>;
  countryName$: Observable<any>;
  titleName$: Observable<any>;

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    private service: CheckoutService
  ) {}

  ngOnInit() {
    this.deliveryMode$ = this.store
      .select(fromCheckoutStore.getSelectedDeliveryMode)
      .pipe(
        tap(selected => {
          if (selected === null) {
            this.service.loadSupportedDeliveryModes();
          }
        })
      );

    this.countryName$ = this.store
      .select(
        fromUserStore.countrySelectorFactory(
          this.deliveryAddress.country.isocode
        )
      )
      .pipe(
        tap(country => {
          if (country === null) {
            this.store.dispatch(new fromUserStore.LoadDeliveryCountries());
          }
        })
      );

    this.titleName$ = this.store
      .select(
        fromUserStore.titleSelectorFactory(this.deliveryAddress.titleCode)
      )
      .pipe(
        tap(title => {
          if (title === null) {
            this.store.dispatch(new fromUserStore.LoadTitles());
          }
        })
      );
  }

  toggleTAndC() {
    this.tAndCToggler = !this.tAndCToggler;
  }

  back() {
    this.backStep.emit();
  }

  submitOrder() {
    this.placeOrder.emit();
  }
}
