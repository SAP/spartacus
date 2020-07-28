import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  Country,
  Region,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitAddressFormService } from './unit-address-form.service';

@Component({
  selector: 'cx-unit-address-form',
  templateUrl: './unit-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddressFormComponent implements OnInit {
  countries$: Observable<Country[]>;
  titles$: Observable<Title[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input() form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected userService: UserService,
    protected userAddressService: UserAddressService,
    protected unitAddressFormService: UnitAddressFormService
  ) {}

  ngOnInit() {
    this.countries$ = this.unitAddressFormService.getDeliveryCountries();
    this.titles$ = this.unitAddressFormService.getTitles();

    // Fetching regions
    this.regions$ = this.selectedCountry$.pipe(
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
  }

  countrySelected(country: Country): void {
    this.form['controls'].country['controls'].isocode.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
  }
}
