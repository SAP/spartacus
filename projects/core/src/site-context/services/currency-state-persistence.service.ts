import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
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

  protected initialized$ = new ReplaySubject<unknown>(1);

  public initSync(): Observable<unknown> {
    this.statePersistenceService.syncWithStorage({
      key: CURRENCY_CONTEXT_ID,
      state$: this.currencyService.getActive(),
      onRead: (state) => this.onRead(state),
    });
    return this.initialized$;
  }

  protected onRead(valueFromStorage: string): void {
    if (!this.currencyService.isInitialized() && valueFromStorage) {
      this.currencyService.setActive(valueFromStorage);
    }

    if (!this.initialized$.closed) {
      this.initialized$.next();
      this.initialized$.complete();
    }
  }
}
