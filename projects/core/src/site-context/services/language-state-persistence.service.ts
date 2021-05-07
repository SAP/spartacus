import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { getContextParameterValues } from '../config/context-config-utils';
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

  protected valueInitialized$ = new ReplaySubject<boolean>();

  /**
   * Initializes the synchronization of the active language with the local storage.
   *
   * @returns `valueInitialized$`: Observable that emits true if the active language is initialized.
   *          Emits false if it's left not initialized.
   *          Completes after the emission.
   */
  public initSync(): { valueInitialized$: Observable<boolean> } {
    this.statePersistenceService.syncWithStorage({
      key: LANGUAGE_CONTEXT_ID,
      state$: this.languageService.getActive(),
      onRead: (state) => this.onRead(state),
    });
    return { valueInitialized$: this.valueInitialized$ };
  }

  protected onRead(valueFromStorage: string): void {
    let wasAlreadyInitialized = false;
    this.languageService
      .getActive()
      .subscribe(() => (wasAlreadyInitialized = true))
      .unsubscribe();

    // don't set the value from storage, if it has been already initialized
    // (i.e. retrieved from route or transferred from SSR)
    if (!wasAlreadyInitialized && this.isValid(valueFromStorage)) {
      this.languageService.setActive(valueFromStorage);
      this.valueInitialized$.next(true);
      return;
    }

    this.valueInitialized$.next(wasAlreadyInitialized);
    this.valueInitialized$.complete();
  }

  /**
   * Tells whether the given iso code is allowed.
   *
   * The list of allowed iso codes can be configured in the `context` config of Spartacus.
   */
  protected isValid(value: string): boolean {
    return (
      !!value &&
      getContextParameterValues(this.config, LANGUAGE_CONTEXT_ID).includes(
        value
      )
    );
  }
}
