import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TrackingService } from './tracking.service';

@NgModule({
  providers: [
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (trackingService: TrackingService) => () => {
        trackingService.subcribeToTrackingEvents();
      },
      deps: [TrackingService],
    },
  ],
})
export class TrackingModule {}
