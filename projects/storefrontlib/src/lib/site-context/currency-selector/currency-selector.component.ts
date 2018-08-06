import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../shared/store';
import { ConfigService } from '../config.service';

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
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromStore.getCurrenciesLoaded)
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCurrencies());
        }
      });

    this.currencies$ = this.store.select(fromStore.getAllCurrencies);
    this.activeCurrency = this.configService.site.currency;
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
    // UNIVERSAL PLUMB
    //sessionStorage.setItem('currency', this.activeCurrency);
  }
}
