import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { BaseSiteService } from '../facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';

@Injectable({ providedIn: 'root' })
export class BaseSiteInitializer implements OnDestroy {
  constructor(
    protected baseSiteService: BaseSiteService,
    protected configInit: ConfigInitializerService
  ) {}

  protected subscription: Subscription;

  /**
   * Initializes the value of the base site
   */
  initialize(): void {
    this.subscription = this.configInit
      .getStable('context')
      .pipe(
        // TODO(#12351): <--- plug here explicitly SiteContextRoutesHandler
        switchMap(() => this.setFallbackValue())
      )
      .subscribe();
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value taken from config, unless the active base site has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active base site value based on the default value from the config,
   * unless the active base site has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    if (!this.baseSiteService.isInitialized()) {
      this.baseSiteService.setActive(
        getContextParameterDefault(config, BASE_SITE_CONTEXT_ID)
      );
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
