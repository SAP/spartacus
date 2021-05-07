import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { LanguageStatePersistenceService } from './language-state-persistence.service';

@Injectable({ providedIn: 'root' })
export class LanguageInitializer {
  constructor(
    protected languageService: LanguageService,
    protected languageStatePersistenceService: LanguageStatePersistenceService,
    protected config: SiteContextConfig
  ) {}

  /**
   * Initializes the value of the active language.
   *
   * @returns Observable that emits and completes when the initialization process is completed.
   */
  initialize(): Observable<unknown> {
    return this.languageStatePersistenceService
      .initSync()
      .valueInitialized$.pipe(
        tap((valueInitialized) => {
          if (!valueInitialized) {
            this.setFallback();
          }
        })
      );
  }

  /**
   * Sets the active language based on the default value set in the Spartacus config.
   */
  protected setFallback() {
    this.languageService.setActive(
      getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID)
    );
  }
}
