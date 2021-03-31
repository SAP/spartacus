import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsentStatePersistenceService } from '../../state/services/consent-state-peristence.service';
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
  protected subscription1 = new Subscription();
  protected subscription2 = new Subscription();

  constructor(
    protected statePersistenceService: ConsentStatePersistenceService,
    protected languageService: LanguageService,
    protected currencyService: CurrencyService,
    protected config: SiteContextConfig
  ) {}

  public initSync(): void {
    this.initLanguageSync();
    this.initCurrencySync();
  }

  protected initLanguageSync(): void {
    this.statePersistenceService.syncWithStorage({
      key: 'language',
      state$: this.languageService.getActive(),
      onRead: (state) => this.onReadLanguage(state),
      onPersist: (sub: Subscription) => this.subscription1.add(sub),
      onRemove: () => this.subscription1.unsubscribe(),
    });
  }

  protected initCurrencySync(): void {
    this.statePersistenceService.syncWithStorage({
      key: 'currency',
      state$: this.currencyService.getActive(),
      onRead: (state) => this.onReadCurrency(state),
      onPersist: (sub: Subscription) => this.subscription2.add(sub),
      onRemove: () => this.subscription2.unsubscribe(),
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
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
