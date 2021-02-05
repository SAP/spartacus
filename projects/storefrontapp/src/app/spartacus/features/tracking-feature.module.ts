import { Injectable, NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CxEvent,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { TmsMapper, TmsModule, TMS_MAPPER } from '@spartacus/tracking/tms';

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
  providers: [
    {
      provide: TMS_MAPPER,
      useExisting: GtmMapper,
    },
  ],
  imports: [
    TmsModule.forRoot({
      tagManager: {
        gtm: {
          eventMapper: TMS_MAPPER,
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
