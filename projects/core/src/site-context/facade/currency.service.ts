import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OccConfig } from '../../occ/config/occ-config';

import { StateWithSiteContext, CurrencyEntities } from '../store/state';
import * as actions from '../store/actions/index';
import * as selectors from '../store/selectors/index';

@Injectable()
export class CurrencyService {
  /**
   * Represents all the currencies supported by the current store.
   */
  currencies$: Observable<CurrencyEntities> = this.store.pipe(
    select(selectors.getAllCurrencies)
  );

  /**
   * Represents the active currency of the current store.
   */
  activeCurrency$: Observable<string> = this.store.pipe(
    select(selectors.getActiveCurrency)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.loadAll();
    this.initSessionCurrency();
  }

  /**
   * Selects the active currency by isocode.
   */
  select(isocode?: string) {
    this.store.dispatch(new actions.SetActiveCurrency(isocode));
  }

  /**
   * Loads all the currencies of the current store.
   */
  protected loadAll() {
    this.store.dispatch(new actions.LoadCurrencies());
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
