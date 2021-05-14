import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { LanguageStatePersistenceService } from './language-state-persistence.service';

@Injectable({ providedIn: 'root' })
export class LanguageInitializer implements OnDestroy {
  constructor(
    protected languageService: LanguageService,
    protected languageStatePersistenceService: LanguageStatePersistenceService,
    protected configInit: ConfigInitializerService
  ) {}

  protected subscription: Subscription;

  /**
   * Initializes the value of the active language.
   */
  initialize(): void {
    this.subscription = this.configInit
      .getStable('context')
      .pipe(
        // TODO(#12351): <--- plug here explicitly SiteContextRoutesHandler
        switchMap(() => this.languageStatePersistenceService.initSync()),
        switchMap(() => this.setFallbackValue())
      )
      .subscribe();
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value taken from config, unless the active language has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active language value based on the default value from the config,
   * unless the active language has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    if (!this.languageService.isInitialized()) {
      this.languageService.setActive(
        getContextParameterDefault(config, LANGUAGE_CONTEXT_ID)
      );
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
