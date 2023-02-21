import { TestBed } from '@angular/core/testing';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import { OCC_USER_ID_ANONYMOUS, UserIdService } from '@spartacus/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/base/root';
import {
  MultiCartFacadeStub,
  UserIdServiceStub,
} from 'feature-libs/cart/base/core/facade/active-cart.service.spec';
import { BehaviorSubject, of } from 'rxjs';
import { MockIntendedPickupLocationService } from '../../core/facade/intended-pickup-location.service.spec';
import { PickupInStoreActiveCartService } from './pickup-in-store-active-cart.service';

const userId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

describe('PickupInStoreActiveCartService', () => {
  let service: PickupInStoreActiveCartService;
  let multiCartFacade: MultiCartFacade;
  let intendedPickupLocationFacade: IntendedPickupLocationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PickupInStoreActiveCartService,
        { provide: UserIdService, useClass: UserIdServiceStub },
        { provide: MultiCartFacade, useClass: MultiCartFacadeStub },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
      ],
    });

    service = TestBed.inject(PickupInStoreActiveCartService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    intendedPickupLocationFacade = TestBed.inject(IntendedPickupLocationFacade);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('addEntry', () => {
    it('should add entry with intended pickup location name', () => {
      spyOn(service, 'requireLoadedCart').and.returnValue(
        of({ code: 'code', guid: 'guid' })
      );
      spyOn(multiCartFacade, 'addEntry').and.callThrough();
      spyOn(
        intendedPickupLocationFacade,
        'getIntendedLocation'
      ).and.returnValue(
        of({ name: 'pickupLocationName', pickupOption: 'pickup' })
      );
      userId$.next(OCC_USER_ID_ANONYMOUS);

      service.addEntry('productCode', 2);

      expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS,
        'guid',
        'productCode',
        2,
        'pickupLocationName'
      );
    });

    it('should add entry without intended pickup location', () => {
      spyOn(service, 'requireLoadedCart').and.returnValue(
        of({ code: 'code', guid: 'guid' })
      );
      spyOn(multiCartFacade, 'addEntry').and.callThrough();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      service.addEntry('productCode', 2);

      expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS,
        'guid',
        'productCode',
        2,
        undefined
      );
    });

    it('should add entry for delivery without intended pickup location', () => {
      spyOn(service, 'requireLoadedCart').and.returnValue(
        of({ code: 'code', guid: 'guid' })
      );
      spyOn(multiCartFacade, 'addEntry').and.callThrough();
      spyOn(
        intendedPickupLocationFacade,
        'getIntendedLocation'
      ).and.returnValue(
        of({ name: 'pickupLocationName', pickupOption: 'delivery' })
      );
      userId$.next(OCC_USER_ID_ANONYMOUS);

      service.addEntry('productCode', 2);

      expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS,
        'guid',
        'productCode',
        2,
        undefined
      );
    });
  });
});
