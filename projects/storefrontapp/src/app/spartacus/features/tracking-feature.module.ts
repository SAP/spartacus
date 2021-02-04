import { Injectable, NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CxEvent,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { TmsMapper, TmsModule } from '@spartacus/tracking/tms';

@Injectable({ providedIn: 'root' })
export class GtmMapper implements TmsMapper {
  map<T extends CxEvent>(event: T): object | T {
    console.log('gtm mapper');
    return event;
  }
}
@Injectable({ providedIn: 'root' })
export class AepMapper implements TmsMapper {
  map<T extends CxEvent>(event: T): object | T {
    console.log('aep mapper');
    return event;
  }
}

@NgModule({
  imports: [
    TmsModule.forRoot({
      tagManager: {
        gtm: {
          eventMapper: GtmMapper,
          events: [NavigationEvent, CartAddEntrySuccessEvent],
        },
        aep: {
          eventMapper: AepMapper,
          events: [NavigationEvent, CartRemoveEntrySuccessEvent],
        },
      },
    }),
  ],
})
export class TrackingFeatureModule {}
