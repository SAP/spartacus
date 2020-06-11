import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency, CurrencyService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyCommonFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    isocode: [null, Validators.required],
  };

  constructor(
    protected fb: FormBuilder,
    protected currencyService: CurrencyService
  ) {}

  getCurrencies(): Observable<Currency[]> {
    return this.currencyService.getAll();
  }

  getForm(): FormGroup {
    return this.fb.group(this.formConfiguration);
  }
}
