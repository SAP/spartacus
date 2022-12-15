import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { DeliveryPointOfServiceItems } from 'feature-libs/pickup-in-store/root/model';
import { Observable, of } from 'rxjs';
import { DeliveryPointsService } from './delivery-points.service';

class MockActiveCartFacade {
  getActive(): Observable<Cart> {
    const CART: Cart = {
      entries: [
        { deliveryPointOfService: { name: 'A Store' } },
        { deliveryPointOfService: { name: 'B Store' } },
      ],
    };
    return of(CART);
  }
}
class MockPickupLocationsSearchFacade {
  loadStoreDetails(): void {}
  getStoreDetails(): Observable<PointOfService> {
    const POINT_OF_SERVICE: PointOfService = {};
    return of(POINT_OF_SERVICE);
  }
}

describe('DeliveryPointsService', () => {
  let deliveryPointsService: DeliveryPointsService;
  let activeCartFacade: ActiveCartFacade;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchFacade,
        },
      ],
    });

    deliveryPointsService = TestBed.inject(DeliveryPointsService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);

    spyOn(activeCartFacade, 'getActive').and.callThrough();
    spyOn(pickupLocationsSearchService, 'loadStoreDetails').and.callThrough();
    spyOn(pickupLocationsSearchService, 'getStoreDetails').and.callThrough();
  });

  it('should be created', () => {
    expect(deliveryPointsService).toBeDefined();
  });

  it('getDeliveryPointsOfService should return: Observable<Array<DeliveryPointOfServiceItems>> ', () => {
    deliveryPointsService.getDeliveryPointsOfService().subscribe();

    expect(activeCartFacade.getActive).toHaveBeenCalled();
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledTimes(
      2
    );
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'A Store'
    );
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledTimes(
      2
    );
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'B Store'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'A Store'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'B Store'
    );
  });
});

export class DeliveryPointsServiceMock {
  getDeliveryPointsOfService(): Observable<Array<DeliveryPointOfServiceItems>> {
    return of([]);
  }
}
