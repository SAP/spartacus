import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OccConfig } from '../../occ/config/occ-config';

import { StateWithSiteContext, CurrencyEntities } from '../store/state';
import * as actions from '../store/actions/index';
import * as selectors from '../store/selectors/index';

@Injectable()
export class CurrencyService {
  currencies$: Observable<CurrencyEntities> = this.store.pipe(
    select(selectors.getAllCurrencies)
  );

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

  select(isocode?: string) {
    this.store.dispatch(new actions.SetActiveCurrency(isocode));
  }

  protected loadAll() {
    this.store.dispatch(new actions.LoadCurrencies());
  }

  protected initSessionCurrency() {
    if (sessionStorage && !!sessionStorage.getItem('currency')) {
      this.select(sessionStorage.getItem('currency'));
    } else {
      this.select(this.config.site.currency);
    }
  }
}
