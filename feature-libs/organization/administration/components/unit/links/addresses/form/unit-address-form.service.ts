/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Address,
  Country,
  Region,
  Title,
  UserAddressService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
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
    const form = new UntypedFormGroup({});
    form.setControl('id', new UntypedFormControl(''));
    form.setControl('titleCode', new UntypedFormControl(''));
    form.setControl(
      'firstName',
      new UntypedFormControl('', Validators.required)
    );
    form.setControl(
      'lastName',
      new UntypedFormControl('', Validators.required)
    );
    form.setControl('line1', new UntypedFormControl('', Validators.required));
    form.setControl('line2', new UntypedFormControl(''));
    form.setControl('town', new UntypedFormControl('', Validators.required));
    form.setControl(
      'country',
      new UntypedFormGroup({
        isocode: new UntypedFormControl(null, Validators.required),
      })
    );
    form.setControl(
      'region',
      new UntypedFormGroup({
        isocode: new UntypedFormControl(null, Validators.required),
      })
    );
    form.setControl(
      'postalCode',
      new UntypedFormControl('', Validators.required)
    );
    form.setControl('phone', new UntypedFormControl(''));
    form.setControl('cellphone', new UntypedFormControl(''));

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
    let selectedCountryCode = this.form?.get('country.isocode')?.value;
    let newCountryCode: string;

    return (
      this.getForm()
        ?.get('country.isocode')
        ?.valueChanges.pipe(
          filter((countryIsoCode) => Boolean(countryIsoCode)),
          switchMap((countryIsoCode) => {
            newCountryCode = countryIsoCode;
            return this.userAddressService.getRegions(countryIsoCode);
          }),
          tap((regions: Region[]) => {
            const regionControl = this.form?.get('region.isocode');
            if (!regions || regions.length === 0) {
              regionControl?.disable();
            } else {
              regionControl?.enable();
            }
            if (selectedCountryCode && newCountryCode !== selectedCountryCode) {
              regionControl?.reset();
            }
            selectedCountryCode = newCountryCode;
          })
        ) ?? of([])
    );
  }
}
