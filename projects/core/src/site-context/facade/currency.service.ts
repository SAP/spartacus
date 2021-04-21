import { Injectable, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Currency } from '../../model/misc.model';
import { WindowRef } from '../../window/window-ref';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextSelectors } from '../store/selectors/index';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';

/**
 * Facade that provides easy access to curreny state, actions and selectors.
 */
@Injectable()
export class CurrencyService implements SiteContext<Currency> {
  private sessionStorage: Storage | undefined;

  // TODO: remove winRef for 4.0
  constructor(
    protected store: Store<StateWithSiteContext>,
    @Optional() winRef: WindowRef,
    protected config: SiteContextConfig
  ) {
    if (winRef) {
      this.sessionStorage = winRef.sessionStorage;
    }
  }

  /**
   * Represents all the currencies supported by the current store.
   */
  getAll(): Observable<Currency[]> {
    return this.store.pipe(
      select(SiteContextSelectors.getAllCurrencies),
      tap((currencies) => {
        if (!currencies) {
          this.store.dispatch(new SiteContextActions.LoadCurrencies());
        }
      }),
      filter((currencies) => Boolean(currencies))
    );
  }

  /**
   * Represents the isocode of the active currency.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(SiteContextSelectors.getActiveCurrency),
      filter((active) => Boolean(active))
    );
  }

  /**
   * Sets the active language.
   */
  setActive(isocode: string): void {
    this.store
      .pipe(select(SiteContextSelectors.getActiveCurrency), take(1))
      .subscribe((activeCurrency) => {
        if (activeCurrency !== isocode) {
          this.store.dispatch(
            new SiteContextActions.SetActiveCurrency(isocode)
          );
        }
      });
  }

  /**
   * @deprecated since 3.3, The currency context is persisted via the state persistence mechanism
   *
   * Initials the active currency. The active currency is either given
   * by the last visit (stored in session storage) or by the
   * default session currency of the store.
   */
  initialize(): void {
    let value;
    this.getActive()
      .subscribe((val) => (value = val))
      .unsubscribe();
    if (value) {
      // don't initialize, if there is already a value (i.e. retrieved from route or transferred from SSR)
      return;
    }

    const sessionCurrency =
      this.sessionStorage && this.sessionStorage.getItem('currency');
    if (
      sessionCurrency &&
      getContextParameterValues(this.config, CURRENCY_CONTEXT_ID).includes(
        sessionCurrency
      )
    ) {
      this.setActive(sessionCurrency);
    } else {
      this.setActive(
        getContextParameterDefault(this.config, CURRENCY_CONTEXT_ID)
      );
    }
  }
}
