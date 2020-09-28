import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  B2BAddress,
  Country,
  Region,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { OrganizationFormService } from '../../../../shared/organization-form';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressFormService extends OrganizationFormService<
  B2BAddress
> {
  constructor(
    protected userAddressService: UserAddressService,
    protected userService: UserService
  ) {
    super();
  }

  protected build() {
    const form = new FormGroup({});
    form.setControl('id', new FormControl(''));
    form.setControl('titleCode', new FormControl(''));
    form.setControl('firstName', new FormControl('', Validators.required));
    form.setControl('lastName', new FormControl('', Validators.required));
    form.setControl('line1', new FormControl('', Validators.required));
    form.setControl('line2', new FormControl(''));
    form.setControl('town', new FormControl('', Validators.required));
    form.setControl(
      'country',
      new FormGroup({
        isocode: new FormControl(null, Validators.required),
      })
    );
    form.setControl(
      'region',
      new FormGroup({
        isocode: new FormControl(null),
        // , Validators.required
      })
    );
    form.setControl('postalCode', new FormControl('', Validators.required));
    form.setControl('phone', new FormControl(''));

    this.form = form;
  }

  getCountries(): Observable<Country[]> {
    return this.userAddressService.getDeliveryCountries().pipe(
      tap((countries) => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );
  }

  getTitles(): Observable<Title[]> {
    return this.userService.getTitles().pipe(
      tap((titles) => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      })
    );
  }

  getRegions(): Observable<Region[]> {
    return this.getForm()
      .get('country.isocode')
      .valueChanges.pipe(
        filter((countryIsoCode) => Boolean(countryIsoCode)),
        switchMap((countryIsoCode) =>
          this.userAddressService.getRegions(countryIsoCode)
        ),
        tap((regions) => {
          const regionControl = this.form.get('region');
          if (!regions || regions.length === 0) {
            regionControl.disable();
          } else {
            regionControl.enable();
          }
          if (regions?.length === 0) {
            regionControl.reset();
          }
        })
      );
  }
}
