import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Country } from '@spartacus/core';

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

  countrySelected(country: Country) {
    this.billingAddress['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
  }
}
