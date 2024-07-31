import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
} from '@spartacus/opf/base/root';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfPickupInStoreHandlerService } from './opf-pickup-in-store-handler.service';

describe('OpfPickupInStoreHandlerService', () => {
  let service: OpfPickupInStoreHandlerService;
  let intendedPickupLocationFacadeMock: jasmine.SpyObj<IntendedPickupLocationFacade>;

  beforeEach(() => {
    intendedPickupLocationFacadeMock = jasmine.createSpyObj(
      'IntendedPickupLocationFacade',
      ['getIntendedLocation']
    );
    TestBed.configureTestingModule({
      providers: [
        OpfPickupInStoreHandlerService,
        {
          provide: CurrentProductService,
          useValue: { getProduct: () => of({ code: 'TEST_CODE' }) },
        },
        {
          provide: ActiveCartFacade,
          useValue: { hasDeliveryItems: () => of(true) },
        },
        {
          provide: IntendedPickupLocationFacade,
          useValue: intendedPickupLocationFacadeMock,
        },
      ],
    });

    service = TestBed.inject(OpfPickupInStoreHandlerService);
    TestBed.inject(CurrentProductService);
    TestBed.inject(ActiveCartFacade);
    TestBed.inject(IntendedPickupLocationFacade);
  });

  it('should return pickup delivery type for single product', (done: DoneFn) => {
    intendedPickupLocationFacadeMock.getIntendedLocation.and.returnValue(
      of({ pickupOption: 'pickup' })
    );
    service
      .getSingleProductDeliveryInfo()
      .subscribe((deliveryInfo: OpfQuickBuyDeliveryInfo) => {
        expect(deliveryInfo.type).toBe(OpfQuickBuyDeliveryType.PICKUP);
        done();
      });
  });

  it('should return shipping delivery type when no pickup details', (done: DoneFn) => {
    intendedPickupLocationFacadeMock.getIntendedLocation.and.returnValue(
      of(undefined)
    );
    service
      .getSingleProductDeliveryInfo()
      .subscribe((deliveryInfo: OpfQuickBuyDeliveryInfo) => {
        expect(deliveryInfo.type).toBe(OpfQuickBuyDeliveryType.SHIPPING);
        done();
      });
  });

  it('should return shipping delivery type for active cart', (done: DoneFn) => {
    service
      .getActiveCartDeliveryType()
      .subscribe((deliveryType: OpfQuickBuyDeliveryType) => {
        expect(deliveryType).toBe(OpfQuickBuyDeliveryType.SHIPPING);
        done();
      });
  });
});
