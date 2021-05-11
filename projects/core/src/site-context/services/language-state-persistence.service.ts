import { Injectable } from '@angular/core';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
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

  public initSync() {
    this.statePersistenceService.syncWithStorage({
      key: LANGUAGE_CONTEXT_ID,
      state$: this.languageService.getActive(),
      onRead: (state) => this.onRead(state),
    });
  }

  protected onRead(state: string): void {
    let value;
    this.languageService
      .getActive()
      .subscribe((val) => (value = val))
      .unsubscribe();
    if (value) {
      // don't initialize, if there is already a value (i.e. retrieved from route or transferred from SSR)
      return;
    }

    if (
      state &&
      getContextParameterValues(this.config, LANGUAGE_CONTEXT_ID).includes(
        state
      )
    ) {
      this.languageService.setActive(state);
    } else {
      this.languageService.setActive(
        getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID)
      );
    }
  }
}
