import { Injectable } from '@angular/core';
import {
  B2BAddress,
  Country,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { sortTitles } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressFormService {
  constructor(
    protected userService: UserService,
    protected userAddressService: UserAddressService
  ) {}

  getForm(model?: B2BAddress): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
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
  }

  getDeliveryCountries(): Observable<Country[]> {
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
      }),
      map((titles) => {
        titles.sort(sortTitles);
        const noneTitle = { code: '', name: 'Title' };
        return [noneTitle, ...titles];
      })
    );
  }
}
