import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Address,
  Country,
  Region,
  Title,
  UserAddressService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { FormService } from '../../../../shared/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressFormService extends FormService<Address> {
  constructor(
    protected userAddressService: UserAddressService,
    protected userProfileFacade: UserProfileFacade
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
        isocode: new FormControl(null, Validators.required),
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
    return this.userProfileFacade.getTitles();
  }

  getRegions(): Observable<Region[]> {
    let selectedCountryCode = this.form.get('country.isocode').value;
    let newCountryCode: string;

    return this.getForm()
      .get('country.isocode')
      .valueChanges.pipe(
        filter((countryIsoCode) => Boolean(countryIsoCode)),
        switchMap((countryIsoCode) => {
          newCountryCode = countryIsoCode;
          return this.userAddressService.getRegions(countryIsoCode);
        }),
        tap((regions: Region[]) => {
          const regionControl = this.form.get('region.isocode');
          if (!regions || regions.length === 0) {
            regionControl.disable();
          } else {
            regionControl.enable();
          }
          if (selectedCountryCode && newCountryCode !== selectedCountryCode) {
            regionControl.reset();
          }
          selectedCountryCode = newCountryCode;
        })
      );
  }
}
