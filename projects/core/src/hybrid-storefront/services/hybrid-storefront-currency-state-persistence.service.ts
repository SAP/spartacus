import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, skip, switchMap } from 'rxjs/operators';
import { Session } from '../../model/hybrid-session';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { CurrencyService } from '../../site-context/facade/currency.service';
import { CurrencyStatePersistenceService } from '../../site-context/services/currency-state-persistence.service';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class HybridStorefrontCurrencyStatePersistenceService
  extends CurrencyStatePersistenceService
  implements OnDestroy {
  protected subscription: Subscription;

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected currencyService: CurrencyService,
    protected config: SiteContextConfig,
    protected sessionService: SessionService
  ) {
    super(statePersistenceService, currencyService, config);
  }

  /**
   * Fetches currency from the Session Addon. Afterwards, initializes the synchronization of the active currency with the local storage.
   *
   * @returns Observable that emits and completes when the value is read from the storage.
   */
  initSync(): Observable<unknown> {
    this.subscription = this.sessionService
      .load()
      .subscribe((session: Session) => {
        if (session.session?.currency) {
          this.currencyService.setActive(session.session?.currency);
          this.updateCurrency();
        }
      });

    // Keep executing regular Spartacus state persistence logic
    return super.initSync();
  }

  /**
   * Observes Spartacus currency change. On change, the update is sent to the Session Addon.
   */
  protected updateCurrency(): void {
    this.subscription = this.currencyService
      .getActive()
      .pipe(
        skip(1),
        distinctUntilChanged(),
        switchMap((currency: string) => {
          return this.sessionService.updateCurrency(currency);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
