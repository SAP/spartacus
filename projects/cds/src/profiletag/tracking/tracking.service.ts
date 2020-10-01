import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { skipUntil, tap } from 'rxjs/operators';
import { ProfileTagEventService } from '..';
import { ProfileTagPushEvent } from '../model/profile-tag.model';
import { ProfileTagLifecycleService } from '../services/profile-tag-lifecycle.service';
import { ProfileTagPushEventsService } from '../services/profile-tag-push-events.service';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  constructor(
    protected profileTagLifecycleService: ProfileTagLifecycleService,
    protected profileTagPushEventsService: ProfileTagPushEventsService,
    private profileTagEventTracker: ProfileTagEventService
  ) {}
  subcribeToTrackingEvents(): void {
    merge(
      this.profileTagPushEventsService.getPushEvents(),
      this.profileTagLifecycleService.consentGranted()
    )
      .pipe(
        skipUntil(this.profileTagLifecycleService.consentGranted()),
        tap((item: ProfileTagPushEvent) => {
          this.profileTagEventTracker.notifyProfileTagOfEventOccurence(item);
        })
      )
      .subscribe();
  }
}
