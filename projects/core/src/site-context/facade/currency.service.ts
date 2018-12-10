import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/index';
import { filter, tap } from 'rxjs/operators';
import { Currency } from '../../occ-models';

/**
 * Facade that provides easy access to curreny state, actions and selectors.
 */
@Injectable()
export class CurrencyService {
  constructor(private store: Store<fromStore.StateWithSiteContext>) {}

  /**
   * Represents all the currencies supported by the current store.
   */
  getAll(): Observable<Currency[]> {
    return this.store.pipe(
      select(fromStore.getAllCurrencies),
      tap(currencies => {
        if (!currencies || currencies.length === 0) {
          this.store.dispatch(new fromStore.LoadCurrencies());
        }
      })
    );
  }

  /**
   * Represents the isocode of the active currency.
   */
  getActive(): Observable<string> {
    return this.store
      .pipe(select(fromStore.getActiveCurrency))
      .pipe(filter(Boolean));
  }

  /**
   * Sets the active language.
   */
  setActive(isocode: string) {
    this.store.dispatch(new fromStore.SetActiveCurrency(isocode));
  }

  /**
   * Initials the active currency. The active currency is either given
   * by the last visit (stored in session storage) or by the
   * default session currency of the store.
   */
  initialize(defaultCurrency: string) {
    if (sessionStorage && !!sessionStorage.getItem('currency')) {
      this.setActive(sessionStorage.getItem('currency'));
    } else {
      this.setActive(defaultCurrency);
    }
  }
}
