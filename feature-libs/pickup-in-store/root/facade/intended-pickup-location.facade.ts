import { Injectable } from '@angular/core';
import { facadeFactory, PointOfService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';

// TODO add jsdocs

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: IntendedPickupLocationFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: [
        'getIntendedLocation',
        'setIntendedLocation',
        'removeIntendedLocation',
      ],
      async: true,
    }),
})
export abstract class IntendedPickupLocationFacade {
  abstract getIntendedLocation(productCode: string): Observable<PointOfService>;
  abstract setIntendedLocation(
    productCode: string,
    location: PointOfService
  ): void;
  abstract removeIntendedLocation(productCode: string): void;
}
