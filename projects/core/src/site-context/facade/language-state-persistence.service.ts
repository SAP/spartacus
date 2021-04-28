import { Injectable } from '@angular/core';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { getContextParameterValues } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { LanguageService } from './language.service';

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
    if (
      state &&
      getContextParameterValues(this.config, LANGUAGE_CONTEXT_ID).includes(
        state
      )
    ) {
      this.languageService.setActive(state);
    }
  }
}
