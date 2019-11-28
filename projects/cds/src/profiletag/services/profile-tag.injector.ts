import { merge, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { SpartacusEventTracker } from './spartacus-events';
import { ProfileTagEventTracker } from './profiletag-events';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjector {
  private tracking$;
  private profileTagEvents$;

  constructor(
    private profileTagEventTracker: ProfileTagEventTracker,
    private spartacusEventTracker: SpartacusEventTracker
  ) {}

  track(): Observable<boolean> {
    this.profileTagEvents$ = this.profileTagEventTracker.getProfileTagEvent();
    this.tracking$ = this.spartacusEventTracker.getSpartacusTracking();
    return this.profileTagEventTracker.addTracker().pipe(
      switchMap(_ => merge(this.tracking$, this.profileTagEvents$)),
      mapTo(true)
    );
  }
}
