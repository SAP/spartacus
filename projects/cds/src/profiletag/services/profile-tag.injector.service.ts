import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { CdsBackendConnector } from '../connectors/cds-backend-connector';
import {
  NavigatedPushEvent,
  ProfileTagEvent,
} from '../model/profile-tag.model';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';
import { ProfileTagEventService } from './profiletag-event.service';
import { SpartacusEventService } from './spartacus-event.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjectorService {
  private profileTagEvents$ = this.profileTagEventTracker.getProfileTagEvents();
  private injectionsEvents$: Observable<boolean> = merge(
    this.notifyProfileTagOfPageLoaded(),
    this.notifyEcOfLoginSuccessful(),
    this.notifyPushEvents()
  );
  constructor(
    private profileTagEventTracker: ProfileTagEventService,
    private spartacusEventTracker: SpartacusEventService,
    private cdsBackendConnector: CdsBackendConnector,
    private profileTagLifecycleService: ProfileTagLifecycleService
  ) {}

  track(): Observable<boolean> {
    return this.profileTagEventTracker.addTracker().pipe(
      switchMap(() => merge(this.injectionsEvents$, this.profileTagEvents$)),
      mapTo(true)
    );
  }

  notifyPushEvents() {
    return this.spartacusEventTracker.getPushEvents().pipe(
      tap((item: ProfileTagEvent) =>
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item)
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
