import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsentStatePersistenceService } from '../../state/services/consent-state-peristence.service';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import { CurrencyService } from './currency.service';

@Injectable({ providedIn: 'root' })
export class CurrencyStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: ConsentStatePersistenceService,
    protected currencyService: CurrencyService,
    protected config: SiteContextConfig
  ) {}

  public initSync() {
    this.statePersistenceService.syncWithStorage({
      key: CURRENCY_CONTEXT_ID,
      state$: this.currencyService.getActive(),
      onRead: (state) => this.onRead(state),
      onPersist: (sub: Subscription) => this.subscription.add(sub),
      onRemove: () => this.subscription.unsubscribe(),
    });
  }

  protected onRead(state: string): void {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
