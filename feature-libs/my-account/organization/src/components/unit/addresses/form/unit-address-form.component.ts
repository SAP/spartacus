import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Country, Region, Title, UserAddressService } from '@spartacus/core';
import { UnitAddressFormService } from './unit-address-form.service';

@Component({
  selector: 'cx-unit-address-form',
  templateUrl: './unit-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddressFormComponent {
  @Input() form: FormGroup;

  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  countries$: Observable<
    Country[]
  > = this.unitAddressFormService.getDeliveryCountries();
  titles$: Observable<Title[]> = this.unitAddressFormService.getTitles();
  regions$: Observable<Region[]> = this.selectedCountry$.pipe(
    switchMap((country) => this.userAddressService.getRegions(country)),
    tap((regions) => {
      const regionControl = this.form.get('region');
      if (regions && regions.length > 0) {
        regionControl.enable();
      } else {
        regionControl.disable();
      }
    })
  );

  constructor(
    protected userAddressService: UserAddressService,
    protected unitAddressFormService: UnitAddressFormService
  ) {}

  countrySelected(country: Country): void {
    this.form['controls'].country['controls'].isocode.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
  }
}
