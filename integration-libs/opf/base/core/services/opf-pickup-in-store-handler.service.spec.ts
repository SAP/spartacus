import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfQuickBuyDeliveryType } from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfPickupInStoreHandlerService } from './opf-pickup-in-store-handler.service';

describe('OpfPickupInStoreHandlerService', () => {
  let service: OpfPickupInStoreHandlerService;

  beforeEach(() => {
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
          provide: Store,
          useValue: { pipe: () => of({ pickupOption: 'pickup' }) },
        },
      ],
    });

    service = TestBed.inject(OpfPickupInStoreHandlerService);
    TestBed.inject(CurrentProductService);
    TestBed.inject(ActiveCartFacade);
    TestBed.inject(Store);
  });

  it('should return pickup delivery type for single product', (done: DoneFn) => {
    service
      .getSingleProductDeliveryType()
      .subscribe((deliveryType: OpfQuickBuyDeliveryType) => {
        expect(deliveryType).toBe(OpfQuickBuyDeliveryType.PICKUP);
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
