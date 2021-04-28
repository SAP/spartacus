import { Injectable } from '@angular/core';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { getContextParameterValues } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';
import { CurrencyService } from './currency.service';

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
    if (
      state &&
      getContextParameterValues(this.config, CURRENCY_CONTEXT_ID).includes(
        state
      )
    ) {
      this.currencyService.setActive(state);
    }
  }
}
