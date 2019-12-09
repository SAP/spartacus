import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { ProfileTagEventTracker } from './profiletag-events';
import { SpartacusEventTracker } from './spartacus-events';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  private profileTagEvents$ = this.profileTagEventTracker.getProfileTagEvent();
  private injectionsEvents$: Observable<boolean> = merge(
    this.notifyProfileTagOfConsentGranted(),
    this.notifyProfileTagOfCartChange(),
    this.notifyProfileTagOfPageLoaded()
  );

  constructor(
    private profileTagEventTracker: ProfileTagEventTracker,
    private spartacusEventTracker: SpartacusEventTracker
  ) {}

  track(): Observable<boolean> {
    return this.profileTagEventTracker.addTracker().pipe(
      switchMap(_ => merge(this.injectionsEvents$, this.profileTagEvents$)),
      mapTo(true)
    );
  }

  notifyProfileTagOfConsentGranted() {
    return this.spartacusEventTracker.consentGranted().pipe(
      tap(granted => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence({
          event: 'ConsentChanged',
          granted,
        });
      })
    );
  }

  notifyProfileTagOfCartChange() {
    return this.spartacusEventTracker.cartChanged().pipe(
      tap(([entries, cart]) => {
        const cartSnapshotEvent = {
          event: 'CartSnapshot',
          data: { entries, cart },
        };
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
          cartSnapshotEvent
        );
      }),
      mapTo(true)
    );
  }

  notifyProfileTagOfPageLoaded() {
    return this.spartacusEventTracker.navigated().pipe(
      tap(_ => {
        this.profileTagEventTracker.notifyProfileTagOfEventOccurence({
          event: 'Navigated',
        });
      })
    );
  }
}
