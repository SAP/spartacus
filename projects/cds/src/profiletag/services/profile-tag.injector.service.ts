import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, mapTo, switchMap, tap } from 'rxjs/operators';
import {
  CartChangedPushEvent,
  ConsentChangedPushEvent,
  NavigatedPushEvent,
} from '../model/profile-tag.model';
import { ProfileTagEventService } from './profiletag-event.service';
import { SpartacusEventService } from './spartacus-event.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjectorService {
  private profileTagEvents$ = this.profileTagEventTracker.getProfileTagEvents();
  private injectionsEvents$: Observable<boolean> = merge(
    this.notifyProfileTagOfConsentGranted(),
    this.notifyProfileTagOfCartChange(),
    this.notifyProfileTagOfPageLoaded()
  );

  constructor(
    private profileTagEventTracker: ProfileTagEventService,
    private spartacusEventTracker: SpartacusEventService
  ) {}

  track(): Observable<boolean> {
    return this.profileTagEventTracker.addTracker().pipe(
      switchMap(_ => merge(this.injectionsEvents$, this.profileTagEvents$)),
      mapTo(true)
    );
  }

  private notifyProfileTagOfConsentGranted(): Observable<boolean> {
    return this.spartacusEventTracker.consentGranted().pipe(
      filter(granted => Boolean(granted)),
      tap(granted => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new ConsentChangedPushEvent(granted)
        );
      })
    );
  }

  private notifyProfileTagOfCartChange(): Observable<boolean> {
    return this.spartacusEventTracker.cartChanged().pipe(
      tap(cart => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new CartChangedPushEvent(cart)
        );
      }),
      mapTo(true)
    );
  }

  private notifyProfileTagOfPageLoaded(): Observable<boolean> {
    return this.spartacusEventTracker.navigated().pipe(
      tap(_ => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          new NavigatedPushEvent()
        );
      })
    );
  }
}
