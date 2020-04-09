import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  B2BAddress,
  Country,
  Region,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
import { map, switchMap, tap } from 'rxjs/operators';
import { sortTitles } from '../../../../shared/utils/forms/title-utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cx-unit-address-form',
  templateUrl: './unit-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddressFormComponent extends AbstractFormComponent
  implements OnInit {
  countries$: Observable<Country[]>;
  titles$: Observable<Title[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input()
  addressData: B2BAddress;

  form: FormGroup = this.fb.group({
    id: [''],
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: ['', Validators.required],
    phone: '',
  });

  constructor(
    protected fb: FormBuilder,
    // protected orgUnitService: OrgUnitService,
    protected userService: UserService,
    protected userAddressService: UserAddressService
  ) {
    super();
  }

  ngOnInit() {
    this.countries$ = this.userAddressService.getDeliveryCountries().pipe(
      tap((countries) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );

    // Fetching titles
    this.titles$ = this.userService.getTitles().pipe(
      tap((titles) => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      }),
      map((titles) => {
        titles.sort(sortTitles);
        const noneTitle = { code: '', name: 'Title' };
        return [noneTitle, ...titles];
      })
    );

    // Fetching regions
    this.regions$ = this.selectedCountry$.pipe(
      switchMap((country) => this.userAddressService.getRegions(country)),
      tap((regions) => {
        const regionControl = this.form.get('region.isocode');
        if (regions && regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
        }
      })
    );

    if (this.addressData && Object.keys(this.addressData).length !== 0) {
      this.form.patchValue(this.addressData);
    }
  }

  countrySelected(country: Country): void {
    this.form['controls'].country['controls'].isocode.setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
  }
}
