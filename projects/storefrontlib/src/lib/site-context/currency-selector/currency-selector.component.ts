import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import {
  SiteContextConfig,
  SetActiveCurrency,
  CurrencyChange,
  LoadCurrencies,
  getCurrenciesLoadAttempted,
  getCurrenciesLoading,
  getAllCurrencies,
  StateWithSiteContext
} from '@spartacus/core';

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
    private store: Store<StateWithSiteContext>,
    private config: SiteContextConfig
  ) {}

  ngOnInit() {
    this.subscription = combineLatest(
      this.store.pipe(select(getCurrenciesLoadAttempted)),
      this.store.pipe(select(getCurrenciesLoading))
    ).subscribe(([loadAttempted, loading]) => {
      if (!loadAttempted && !loading) {
        this.store.dispatch(new LoadCurrencies());
      }
    });

    this.currencies$ = this.store.pipe(select(getAllCurrencies));
    this.activeCurrency = this.getActiveCurrency();
    this.store.dispatch(new SetActiveCurrency(this.activeCurrency));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setActiveCurrency(currency) {
    this.activeCurrency = currency;
    this.store.dispatch(new SetActiveCurrency(this.activeCurrency));

    this.store.dispatch(new CurrencyChange());
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
