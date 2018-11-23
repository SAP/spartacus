import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithSiteContext, CurrencyEntities } from '../store/state';
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
  currencies$: Observable<CurrencyEntities> = this.store.pipe(
    select(getAllCurrencies)
  );

  activeCurrency$: Observable<string> = this.store.pipe(
    select(getActiveCurrency)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.selectLatest();
    this.loadAll();
  }

  protected loadAll() {
    this.store.dispatch(new LoadCurrencies());
  }

  public select(isocode?: string) {
    this.store.dispatch(new SetActiveCurrency(isocode));
  }

  protected selectLatest() {
    if (sessionStorage) {
      this.select(
        !sessionStorage.getItem('currency')
          ? this.config.site.currency
          : sessionStorage.getItem('currency')
      );
    } else {
      this.select(this.config.site.currency);
    }
  }
}
