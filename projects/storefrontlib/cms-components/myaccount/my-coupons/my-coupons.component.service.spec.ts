import { TestBed } from '@angular/core/testing';
import {
  CustomerCoupon,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { MyCouponsComponentService } from './my-coupons.component.service';

const couponForAllProduct: CustomerCoupon = {
  couponId: 'CouponForAllProduct',
  allProductsApplicable: true,
};
const couponForPartProduct: CustomerCoupon = {
  couponId: 'CouponForPartProduct',
  allProductsApplicable: false,
};

const RELEVANCE = ':relevance';
const CUSTOMER_COUPON_CODE = ':customerCouponCode:';

describe('MyCouponsComponentService', () => {
  let service: MyCouponsComponentService;
  let routingService = jasmine.createSpyObj('RoutingService', ['go']);
  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyCouponsComponentService,
        { provide: RoutingService, useValue: routingService },
        { provide: TranslationService, useValue: translationService },
      ],
    });
    routingService.go.and.stub();
    service = TestBed.inject(MyCouponsComponentService);
    routingService = TestBed.inject(RoutingService);

    translationService.translate.and.stub();
  });

  it('should service be created', () => {
    expect(service).toBeTruthy();
  });

  it('should launchSearchPage with couponForAllProduct', () => {
    service.launchSearchPage(couponForAllProduct);
    expect(routingService.go).toHaveBeenCalledWith(
      {
        cxRoute: 'search',
        params: { query: RELEVANCE },
      },
      {
        queryParams: {
          couponcode: 'CouponForAllProduct',
        },
      }
    );
  });

  it('should launchSearchPage with couponForPartProduct', () => {
    service.launchSearchPage(couponForPartProduct);
    expect(routingService.go).toHaveBeenCalledWith(
      {
        cxRoute: 'search',
        params: {
          query: RELEVANCE + CUSTOMER_COUPON_CODE + 'CouponForPartProduct',
        },
      },
      {
        queryParams: {
          couponcode: 'CouponForPartProduct',
        },
      }
    );
  });

  it('should translate sort labels', () => {
    service.getSortLabels();
    expect(translationService.translate).toHaveBeenCalledTimes(4);
  });
});
