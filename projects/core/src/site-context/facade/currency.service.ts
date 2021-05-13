import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Currency } from '../../model/misc.model';
import { getContextParameterValues } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextSelectors } from '../store/selectors/index';
import { StateWithSiteContext } from '../store/state';
import { SiteContext } from './site-context.interface';

/**
 * Facade that provides easy access to currency state, actions and selectors.
 */
@Injectable()
export class CurrencyService implements SiteContext<Currency> {
  constructor(
    protected store: Store<StateWithSiteContext>,
    protected config: SiteContextConfig
  ) {}

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
        if (activeCurrency !== isocode && this.isValid(isocode)) {
          this.store.dispatch(
            new SiteContextActions.SetActiveCurrency(isocode)
          );
        }
      });
  }

  /**
   * Tells whether the value of the active currency has been already initialized
   */
  isInitialized(): boolean {
    let valueInitialized = false;
    this.getActive()
      .subscribe(() => (valueInitialized = true))
      .unsubscribe();

    return valueInitialized;
  }

  /**
   * Tells whether the given iso code is allowed.
   *
   * The list of allowed iso codes can be configured in the `context` config of Spartacus.
   */
  protected isValid(value: string): boolean {
    return (
      !!value &&
      getContextParameterValues(this.config, CURRENCY_CONTEXT_ID).includes(
        value
      )
    );
  }
}
