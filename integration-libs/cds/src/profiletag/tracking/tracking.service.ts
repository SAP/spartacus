import { Injectable } from '@angular/core';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { ProfileTagLifecycleService } from '../services/profile-tag-lifecycle.service';
import { ProfileTagPushEventsService } from '../services/profile-tag-push-events.service';
import { ProfileTagEventService } from '../services/profiletag-event.service';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  constructor(
    protected profileTagLifecycleService: ProfileTagLifecycleService,
    protected profileTagPushEventsService: ProfileTagPushEventsService,
    private profileTagEventTracker: ProfileTagEventService
  ) {}
  static factory(trackingService: TrackingService): () => void {
    const factoryFunction = () => {
      trackingService.trackEvents();
    };
    return factoryFunction;
  }
  trackEvents(): void {
    this.profileTagPushEventsService
      .getPushEvents()
      .pipe(
        withLatestFrom(
          this.profileTagLifecycleService.consentChanged().pipe(
            tap((event) => {
              // always notify of consent changes
              this.profileTagEventTracker.notifyProfileTagOfEventOccurence(
                event
              );
            })
          )
        ),
        filter(([_event, consentChanged]) => consentChanged.data.granted), //don't notify other events until consent is granted
        tap(([event]) => {
          this.profileTagEventTracker.notifyProfileTagOfEventOccurence(event);
        })
      )
      .subscribe();
  }
}
