import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';

@Injectable({ providedIn: 'root' })
export class LanguageStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected languageService: LanguageService,
    protected config: SiteContextConfig
  ) {}

  protected initialized$ = new ReplaySubject<unknown>(1);

  /**
   * Initializes the synchronization of the active language with the local storage.
   *
   * @returns Observable that emits and completes when the value is read from the storage.
   */
  public initSync(): Observable<unknown> {
    this.statePersistenceService.syncWithStorage({
      key: LANGUAGE_CONTEXT_ID,
      state$: this.languageService.getActive(),
      onRead: (state) => this.onRead(state),
    });
    return this.initialized$;
  }

  protected onRead(valueFromStorage: string): void {
    if (!this.languageService.isInitialized() && valueFromStorage) {
      this.languageService.setActive(valueFromStorage);
    }

    if (!this.initialized$.closed) {
      this.initialized$.next();
      this.initialized$.complete();
    }
  }
}
