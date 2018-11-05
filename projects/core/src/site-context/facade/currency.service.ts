import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithSiteContext, CurrencyEntities } from '../store/state';
import { SiteContextConfig } from '../config/config';
import {
  LoadCurrencies,
  SetActiveCurrency,
  getAllCurrencies,
  getActiveCurrency
} from '../store';

@Injectable()
export class CurrencyService {
  readonly currencies$: Observable<CurrencyEntities> = this.store.pipe(
    select(getAllCurrencies)
  );

  readonly activeCurrency$: Observable<string> = this.store.pipe(
    select(getActiveCurrency)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: SiteContextConfig
  ) {
    this.initActiveCurrency();
    this.loadCurrencies();
  }

  protected loadCurrencies() {
    this.store.dispatch(new LoadCurrencies());
  }

  public set activeCurrency(isocode: string) {
    this.store.dispatch(new SetActiveCurrency(isocode));
  }

  protected initActiveCurrency() {
    if (sessionStorage) {
      this.activeCurrency = !sessionStorage.getItem('currency')
        ? this.config.site.currency
        : sessionStorage.getItem('currency');
    } else {
      this.activeCurrency = this.config.site.currency;
    }
  }
}
