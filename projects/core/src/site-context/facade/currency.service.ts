import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { StateWithSiteContext } from '../store/state';
import { Currency } from '../../occ-models/occ.models';
import {
  LoadCurrencies,
  SetActiveCurrency
} from '../store/actions/currencies.action';
import {
  getAllCurrencies,
  getActiveCurrency
} from '../store/selectors/currencies.selectors';
import { OccConfig } from '../../occ/config/occ-config';

@Injectable()
export class CurrencyService {
  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.initActive();
    this.load();
  }

  get(): Observable<Currency[]> {
    return this.store.pipe(select(getAllCurrencies));
  }

  load(): void {
    this.store.dispatch(new LoadCurrencies());
  }

  getActive(): Observable<string> {
    return this.store.pipe(select(getActiveCurrency));
  }

  setActive(isocode: string): void {
    this.store.dispatch(new SetActiveCurrency(isocode));
  }

  initActive(): void {
    if (sessionStorage) {
      const currency = !sessionStorage.getItem('currency')
        ? this.config.site.currency
        : sessionStorage.getItem('currency');

      this.setActive(currency);
    } else {
      this.setActive(this.config.site.currency);
    }
  }
}
