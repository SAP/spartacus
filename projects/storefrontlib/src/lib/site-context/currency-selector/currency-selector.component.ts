import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { SiteContextConfig } from '@spartacus/core';
import * as fromStore from '@spartacus/core';

@Component({
  selector: 'y-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectorComponent implements OnInit, OnDestroy {
  currencies$: Observable<any>;
  activeCurrency: string;
  subscription: Subscription;

  constructor(
    private store: Store<fromStore.SiteContextState>,
    private config: SiteContextConfig
  ) {}

  ngOnInit() {
    this.subscription = combineLatest(
      this.store.pipe(select(fromStore.getCurrenciesLoadAttempted)),
      this.store.pipe(select(fromStore.getCurrenciesLoading))
    ).subscribe(([loadAttempted, loading]) => {
      if (!loadAttempted && !loading) {
        this.store.dispatch(new fromStore.LoadCurrencies());
      }
    });

    this.currencies$ = this.store.pipe(select(fromStore.getAllCurrencies));
    this.activeCurrency = this.getActiveCurrency();
    this.store.dispatch(new fromStore.SetActiveCurrency(this.activeCurrency));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setActiveCurrency(currency) {
    this.activeCurrency = currency;
    this.store.dispatch(new fromStore.SetActiveCurrency(this.activeCurrency));

    this.store.dispatch(new fromStore.CurrencyChange());
    if (sessionStorage) {
      sessionStorage.setItem('currency', this.activeCurrency);
    }
  }

  protected getActiveCurrency(): string {
    if (sessionStorage) {
      return sessionStorage.getItem('currency') === null
        ? this.config.site.currency
        : sessionStorage.getItem('currency');
    } else {
      return this.config.site.currency;
    }
  }
}
