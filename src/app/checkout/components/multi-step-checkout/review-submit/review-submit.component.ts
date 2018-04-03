import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { CheckoutService } from '../../../services';
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

  @Output() backStep = new EventEmitter<any>();

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
        fromCheckoutStore.countrySelectorFactory(
          this.deliveryAddress.country.isocode
        )
      )
      .pipe(
        tap(country => {
          if (country === null) {
            this.store.dispatch(new fromCheckoutStore.LoadDeliveryCountries());
          }
        })
      );

    this.titleName$ = this.store
      .select(
        fromCheckoutStore.titleSelectorFactory(this.deliveryAddress.titleCode)
      )
      .pipe(
        tap(title => {
          if (title === null) {
            this.store.dispatch(new fromCheckoutStore.LoadDeliveryCountries());
          }
        })
      );
  }

  back() {
    this.backStep.emit();
  }
}
