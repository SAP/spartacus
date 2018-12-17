import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../../store/index';
import { CheckoutService } from '../../../../facade/checkout.service';
import {
  Title,
  Country,
  Region,
  UserState,
  getAllTitles,
  LoadTitles,
  getAllRegions,
  LoadRegions
} from '@spartacus/core';

@Component({
  selector: 'cx-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingAddressFormComponent implements OnInit, OnDestroy {
  titles$: Observable<any>;
  regions$: Observable<any>;

  @Input()
  billingAddress: FormGroup;

  @Input()
  countries$: Observable<any>;

  constructor(
    protected store: Store<UserState>,
    protected checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    // Fetching titles
    this.titles$ = this.store.pipe(
      select(getAllTitles),
      tap(titles => {
        // If the store is empty fetch titles. This is also used when changing language.
        if (Object.keys(titles).length === 0) {
          this.store.dispatch(new LoadTitles());
        }
      })
    );

    // Fetching regions
    this.regions$ = this.store.pipe(
      select(getAllRegions),
      tap(regions => {
        const regionControl = this.billingAddress.get('region.isocode');

        // If the store is empty fetch regions. This is also used when changing language.
        if (Object.keys(regions).length === 0) {
          regionControl.disable();
          const countryIsoCode = this.billingAddress.get('country.isocode')
            .value;
          if (countryIsoCode) {
            this.store.dispatch(new LoadRegions(countryIsoCode));
          }
        } else {
          regionControl.enable();
        }
      })
    );
  }

  titleSelected(title: Title) {
    this.billingAddress['controls'].titleCode.setValue(title.code);
  }

  countrySelected(country: Country) {
    this.billingAddress['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
    this.store.dispatch(new LoadRegions(country.isocode));
  }

  regionSelected(region: Region) {
    this.billingAddress['controls'].region['controls'].isocode.setValue(
      region.isocode
    );
  }

  ngOnDestroy() {
    this.store.dispatch(
      new fromCheckoutStore.ClearAddressVerificationResults()
    );
  }
}
