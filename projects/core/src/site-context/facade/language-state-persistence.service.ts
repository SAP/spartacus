import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsentStatePersistenceService } from '../../state/services/consent-state-peristence.service';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class LanguageStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: ConsentStatePersistenceService,
    protected languageService: LanguageService,
    protected config: SiteContextConfig
  ) {}

  public initSync() {
    this.statePersistenceService.syncWithStorage({
      key: LANGUAGE_CONTEXT_ID,
      state$: this.languageService.getActive(),
      skipConsent: true,
      onRead: (state) => this.onRead(state),
      onPersist: (sub: Subscription) => this.subscription.add(sub),
      onRemove: () => this.subscription.unsubscribe(),
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
    } else {
      this.languageService.setActive(
        getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
