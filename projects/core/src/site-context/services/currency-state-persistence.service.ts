import { Injectable } from '@angular/core';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade/currency.service';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';

@Injectable({ providedIn: 'root' })
export class CurrencyStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected currencyService: CurrencyService,
    protected config: SiteContextConfig
  ) {}

  public initSync() {
    this.statePersistenceService.syncWithStorage({
      key: CURRENCY_CONTEXT_ID,
      state$: this.currencyService.getActive(),
      onRead: (state) => this.onRead(state),
    });
  }

  protected onRead(state: string): void {
    let value;
    this.currencyService
      .getActive()
      .subscribe((val) => (value = val))
      .unsubscribe();
    if (value) {
      // don't initialize, if there is already a value (i.e. retrieved from route or transferred from SSR)
      return;
    }

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
}
