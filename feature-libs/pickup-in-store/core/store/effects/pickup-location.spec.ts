import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PickupLocationConnector } from '../../connectors';
import { PickupLocationEffect } from './pickup-location.effect';
class MockPickupLocationConnector {
  getStoreDetails = (_storeName: string): Observable<PointOfService> => of({});
}
describe('PickupLocationEffect', () => {
  // let pickupLocationEffects: PickupLocationEffect;
  let actions$: Observable<any>;
  let pickupLocationConnector: PickupLocationConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],

      providers: [
        {
          provide: PickupLocationConnector,
          useClass: MockPickupLocationConnector,
        },
        PickupLocationEffect,

        provideMockActions(() => actions$),
      ],
    });

    // pickupLocationEffects = TestBed.inject(PickupLocationEffect);
    pickupLocationConnector = TestBed.inject(PickupLocationConnector);
  });
  it('should call the connector on the get store details action and create a success action', () => {
    spyOn(pickupLocationConnector, 'getStoreDetails').and.callThrough();
    // const action = GetStoreDetailsById({payload:'storeName'});
    // const actionSuccess = GetStoreDetailsById()
  });
});
