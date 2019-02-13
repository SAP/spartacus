import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Country } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'cx-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingAddressFormComponent {
  @Input()
  billingAddress: FormGroup;

  @Input()
  countries$: Observable<Country[]>;

  countrySelected(country: Country): void {
    this.billingAddress['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
  }
}
