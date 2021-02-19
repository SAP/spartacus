import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../providers/context-ids';
import { CurrencyService } from './currency.service';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class SiteContextPersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected languageService: LanguageService,
    protected currencyService: CurrencyService,
    protected config: SiteContextConfig
  ) {}

  public initSync(): void {
    this.subscription.add(this.initLanguageSync());
    this.subscription.add(this.initCurrencySync());
  }

  protected initLanguageSync(): Subscription {
    return this.statePersistenceService.syncWithStorage({
      key: 'language',
      state$: this.languageService.getActive(),
      onRead: (state) => this.onReadLanguage(state),
    });
  }

  protected initCurrencySync(): Subscription {
    return this.statePersistenceService.syncWithStorage({
      key: 'currency',
      state$: this.currencyService.getActive(),
      onRead: (state) => this.onReadCurrency(state),
    });
  }

  protected onReadLanguage(state: string): void {
    if (
      state &&
      getContextParameterValues(this.config, LANGUAGE_CONTEXT_ID).includes(
        state
      )
    ) {
      this.languageService.setActive(state);
    } else {
      this.languageService.setActive(
        getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID)
      );
    }
  }

  protected onReadCurrency(state: string): void {
    if (
      state &&
      getContextParameterValues(this.config, CURRENCY_CONTEXT_ID).includes(
        state
      )
    ) {
      this.currencyService.setActive(state);
    } else {
      this.currencyService.setActive(
        getContextParameterDefault(this.config, CURRENCY_CONTEXT_ID)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
