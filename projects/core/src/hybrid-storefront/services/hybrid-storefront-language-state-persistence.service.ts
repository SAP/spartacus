import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, skip, switchMap } from 'rxjs/operators';
import { Session } from '../../model/hybrid-session';
import { SiteContextConfig } from '../../site-context/config/site-context-config';
import { LanguageService } from '../../site-context/facade/language.service';
import { LanguageStatePersistenceService } from '../../site-context/services/language-state-persistence.service';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class HybridStorefrontLanguageStatePersistenceService
  extends LanguageStatePersistenceService
  implements OnDestroy {
  protected subscription: Subscription;

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected languageService: LanguageService,
    protected config: SiteContextConfig,
    protected sessionService: SessionService
  ) {
    super(statePersistenceService, languageService, config);
  }

  /**
   * Fetches language from the Session Addon. Afterwards, initializes the synchronization of the active language with the local storage.
   *
   * @returns Observable that emits and completes when the value is read from the storage.
   */
  initSync(): Observable<unknown> {
    this.subscription = this.sessionService
      .load()
      .subscribe((session: Session) => {
        if (session.session?.language) {
          this.languageService.setActive(session.session?.language);
          this.updateLanguage();
        }
      });

    // Keep executing regular Spartacus state persistence logic
    return super.initSync();
  }

  /**
   * Observes Spartacus language change. On change, the update is sent to the Session Addon.
   */
  protected updateLanguage(): void {
    this.subscription = this.languageService
      .getActive()
      .pipe(
        skip(1),
        distinctUntilChanged(),
        switchMap((language: string) => {
          return this.sessionService.updateLanguage(language);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
