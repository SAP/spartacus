import { Injectable, OnDestroy } from '@angular/core';
import { concat, defer, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade';
import { CURRENCY_CONTEXT_ID } from '../providers';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';

@Injectable({ providedIn: 'root' })
export class CurrencyInitializer implements OnDestroy {
  protected subscription: Subscription;

  constructor(
    protected currencyService: CurrencyService,
    protected currencyStatePersistenceService: CurrencyStatePersistenceService,
    protected configInit: ConfigInitializerService
  ) {}

  /**
   * Initializes the value of the active currency.
   */
  initialize(): void {
    this.subscription = concat(
      this.configInit.getStable('context'),
      // TODO(#12351): <--- plug here explicitly SiteContextRoutesHandler
      // calling initSync() starts synchronization immediately; defer it until above observables complete
      defer(() => this.currencyStatePersistenceService.initSync()),
      this.setFallbackValue()
    ).subscribe();
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value taken from config, unless the active currency has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active currency value based on the default value from the config,
   * unless the active currency has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    if (!this.currencyService.isInitialized()) {
      this.currencyService.setActive(
        getContextParameterDefault(config, CURRENCY_CONTEXT_ID)
      );
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
