import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as fromStore from '../shared/store';
import * as fromRouting from '../../routing/store';
import { PageContext } from '../../routing/models/page-context.model';

import { ConfigService } from '../config.service';

@Component({
  selector: 'y-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectorComponent implements OnInit {
  currencies$: Observable<any>;
  activeCurrency: string;

  constructor(
    private store: Store<fromStore.SiteContextState>,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.store
      .select(fromStore.getCurrenciesLoaded)
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.store.dispatch(new fromStore.LoadCurrencies());
          }
        })
      )
      .subscribe();

    this.currencies$ = this.store.select(fromStore.getAllCurrencies);
    this.setActiveCurrency(this.configService.site.currency);
  }

  setActiveCurrency(currency) {
    this.activeCurrency = currency;
    console.log(this.activeCurrency);
    this.store.dispatch(new fromStore.SetActiveCurrency(this.activeCurrency));

    let pageContext: PageContext;
    this.store
      .select(fromRouting.getRouterState)
      .filter(routerState => routerState !== undefined)
      .subscribe(routerState => (pageContext = routerState.state.context));

    if (pageContext !== undefined) {
      this.store.dispatch(new fromStore.CurrencyChange(pageContext));
    }
    sessionStorage.setItem('currency', this.activeCurrency);
  }
}
