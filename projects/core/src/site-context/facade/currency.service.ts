import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OccConfig } from '../../occ/config/occ-config';
import * as fromStore from '../store/index';

/**
 * Facade that provides easy access to curreny state, actions and selectors.
 */
@Injectable()
export class CurrencyService {
  /**
   * Represents all the currencies supported by the current store.
   */
  currencies$: Observable<fromStore.CurrencyEntities> = this.store.pipe(
    select(fromStore.getAllCurrencies)
  );

  /**
   * Represents the active currency of the current store.
   */
  activeCurrency$: Observable<string> = this.store.pipe(
    select(fromStore.getActiveCurrency)
  );

  constructor(
    private store: Store<fromStore.StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.loadAll();
    this.initSessionCurrency();
  }

  /**
   * Selects the active currency by isocode.
   */
  select(isocode?: string) {
    this.store.dispatch(new fromStore.SetActiveCurrency(isocode));
  }

  /**
   * Loads all the currencies of the current store.
   */
  protected loadAll() {
    this.store.dispatch(new fromStore.LoadCurrencies());
  }

  /**
   * Initials the active currency. The active currency is either given
   * by the last visit (stored in session storage) or by the
   * default session currency of the store.
   */
  protected initSessionCurrency() {
    if (sessionStorage && !!sessionStorage.getItem('currency')) {
      this.select(sessionStorage.getItem('currency'));
    } else {
      this.select(this.config.site.currency);
    }
  }
}
