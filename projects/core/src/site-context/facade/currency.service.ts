import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { StateWithSiteContext } from '../store/state';
import { Currency } from '../../occ/occ-models/occ.models';
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

  protected load(): void {
    this.store.dispatch(new LoadCurrencies());
  }

  protected initActive(): void {
    if (sessionStorage) {
      const currency = !sessionStorage.getItem('currency')
        ? this.config.site.currency
        : sessionStorage.getItem('currency');

      this.setActive(currency);
    } else {
      this.setActive(this.config.site.currency);
    }
  }

  get(): Observable<Currency[]> {
    return this.store.pipe(select(getAllCurrencies));
  }

  getActive(): Observable<string> {
    return this.store.pipe(select(getActiveCurrency));
  }

  setActive(isocode: string): void {
    this.store.dispatch(new SetActiveCurrency(isocode));
  }
}
