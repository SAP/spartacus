import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { CdsBackendConnector } from '../connectors/cds-backend-connector';
import { ProfileTagLifecycle } from '../model/profile-tag-lifecycle';
import {
  NavigatedPushEvent,
  ProfileTagPushEvent,
} from '../model/profile-tag.model';
import { ProfileTagPushEventsService } from './profile-tag-push-events.service';
import { ProfileTagEventService } from './profiletag-event.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjectorService {
  private profileTagEvents$ = this.profileTagEventTracker.getProfileTagEvents();
  private injectionsEvents$: Observable<boolean> = merge(
    this.notifyProfileTagOfPageLoaded(),
    this.notifyEcOfLoginSuccessful(),
    this.notifyPushEvents(),
    this.notifyProfileTagOfConsentChanged()
  );
  constructor(
    private profileTagEventTracker: ProfileTagEventService,
    private profileTagPushEventsService: ProfileTagPushEventsService,
    private cdsBackendConnector: CdsBackendConnector,
    private profileTagLifecycleService: ProfileTagLifecycle
  ) {}

  track(): Observable<boolean> {
    return this.profileTagEventTracker.addTracker().pipe(
      switchMap(() => merge(this.injectionsEvents$, this.profileTagEvents$)),
      mapTo(true)
    );
  }

  notifyPushEvents() {
    return this.profileTagPushEventsService.getPushEvents().pipe(
      tap((item: ProfileTagPushEvent) => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
      }),
      mapTo(true)
    );
  }

  private notifyProfileTagOfConsentChanged(): Observable<boolean> {
    return this.profileTagLifecycleService.consentGranted().pipe(
      tap((event) =>
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(event)
      ),
      mapTo(true)
    );
  }

  private notifyProfileTagOfPageLoaded(): Observable<boolean> {
    return this.profileTagLifecycleService.navigated().pipe(
      tap(() => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new NavigatedPushEvent()
        );
      })
    );
  }

  private notifyEcOfLoginSuccessful(): Observable<boolean> {
    return this.profileTagLifecycleService.loginSuccessful().pipe(
      switchMap((_) => {
        return this.cdsBackendConnector
          .notifySuccessfulLogin()
          .pipe(mapTo(true));
      })
    );
  }
}
