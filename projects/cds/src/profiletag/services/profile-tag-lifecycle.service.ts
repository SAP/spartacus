import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartService,
  AuthActions,
  ConsentService,
  EventService,
  PersonalizationContextService,
} from '@spartacus/core';
import { merge, Observable } from 'rxjs';
import { filter, map, mapTo, take } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import {
  ConsentChangedPushEvent,
  ProfileTagEvent,
} from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagLifecycleService {
  protected lifeCycleEvents$: Observable<ProfileTagEvent> = merge(
    this.consentGranted()
  );
  constructor(
    protected consentService: ConsentService,
    protected router: Router,
    protected config: CdsConfig,
    protected activeCartService: ActiveCartService,
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected personalizationContextService: PersonalizationContextService
  ) {}

  navigated(): Observable<boolean> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      mapTo(true)
    );
  }

  /**
   * We are only interested in the first time the ProfileConsent is granted
   */
  consentGranted(): Observable<ConsentChangedPushEvent> {
    return this.consentService
      .getConsent(this.config.cds.consentTemplateId)
      .pipe(
        filter(Boolean),
        filter((profileConsent) => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        mapTo(true),
        map((granted) => {
          return new ConsentChangedPushEvent(granted);
        }),
        take(1)
      );
  }

  loginSuccessful(): Observable<boolean> {
    return this.actionsSubject.pipe(
      filter((action) => action.type === AuthActions.LOGIN),
      mapTo(true)
    );
  }
}
