import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CheckoutService } from '../../../../facade/checkout.service';
import { Title, Country, Region, UserService } from '@spartacus/core';

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
    protected checkoutService: CheckoutService,
    protected userService: UserService
  ) {}

  ngOnInit() {
    // Fetching titles
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );

    // Fetching regions
    this.regions$ = this.userService.getRegions().pipe(
      tap(regions => {
        const regionControl = this.billingAddress.get('region.isocode');

        if (Object.keys(regions).length === 0) {
          regionControl.disable();
          const countryIsoCode = this.billingAddress.get('country.isocode')
            .value;
          if (countryIsoCode) {
            this.userService.loadRegions(countryIsoCode);
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
    this.userService.loadRegions(country.isocode);
  }

  regionSelected(region: Region) {
    this.billingAddress['controls'].region['controls'].isocode.setValue(
      region.isocode
    );
  }

  ngOnDestroy() {
    this.checkoutService.clearAddressVerificationResults();
  }
}
