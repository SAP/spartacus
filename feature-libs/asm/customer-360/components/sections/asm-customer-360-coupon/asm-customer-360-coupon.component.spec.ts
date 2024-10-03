import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AsmCustomer360CouponList,
  AsmCustomer360Facade,
  AsmCustomer360Response,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360CouponComponent } from './asm-customer-360-coupon.component';
import {
  ActiveCartFacade,
  Cart,
  CartVoucherFacade,
} from '@spartacus/cart/base/root';
import { AsmCustomer360PromotionListingComponent } from '../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.component';

describe('AsmCustomer360CouponComponent', () => {
  let cartVoucherService: CartVoucherFacade;
  let component: AsmCustomer360CouponComponent;
  let fixture: ComponentFixture<AsmCustomer360CouponComponent>;
  let context: AsmCustomer360SectionContextSource<AsmCustomer360CouponList>;
  const mockCart: Cart = {
    code: 'cartId',
  };
  const mockUserId = 'userId';
  const mockCouponList: AsmCustomer360CouponList = {
    type: AsmCustomer360Type.COUPON_LIST,
    coupons: [
      {
        code: 'COUPON_1',
        name: 'NAME OF COUPON_1',
        applied: true,
      },
      {
        code: 'COUPON_2',
        name: 'NAME OF COUPON_2',
        applied: false,
      },
      {
        code: 'COUPON_3',
        name: 'NAME OF COUPON_3',
        applied: false,
      },
    ],
  };
  const mockReloadedCouponList: AsmCustomer360CouponList = {
    type: AsmCustomer360Type.COUPON_LIST,
    coupons: [
      {
        code: 'RELOAD_COUPON_1',
        name: 'NAME OF COUPON_1',
        applied: true,
      },
      {
        code: 'RELOAD_COUPON_2',
        name: 'NAME OF COUPON_2',
        applied: false,
      },
      {
        code: 'RELOAD_COUPON_3',
        name: 'NAME OF COUPON_3',
        applied: false,
      },
    ],
  };
  const mockReloadedAsmCustomer360Response: AsmCustomer360Response = {
    value: [mockReloadedCouponList],
  };
  class MockAsmCustomer360Facade implements Partial<AsmCustomer360Facade> {
    get360Data(): Observable<AsmCustomer360Response> {
      return of(mockReloadedAsmCustomer360Response);
    }
  }
  class MockCartVoucherFacade implements Partial<CartVoucherFacade> {
    getAddVoucherResultError(): Observable<boolean> {
      return of();
    }

    addVoucher(_voucherId: string, _cartId?: string | undefined): void {}

    removeVoucher(_voucherId: string, _cartId?: string | undefined): void {}
  }
  class MockUserIdService implements Partial<UserIdService> {
    getUserId(): Observable<string> {
      return of(mockUserId);
    }
  }
  class MockActiveCartFacade implements Partial<ActiveCartFacade> {
    requireLoadedCart(): Observable<Cart> {
      return of(mockCart);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360CouponComponent,
        AsmCustomer360PromotionListingComponent,
      ],
      providers: [
        AsmCustomer360SectionContextSource,
        {
          provide: AsmCustomer360SectionContext,
          useExisting: AsmCustomer360SectionContextSource,
        },
        {
          provide: CartVoucherFacade,
          useClass: MockCartVoucherFacade,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: AsmCustomer360Facade,
          useClass: MockAsmCustomer360Facade,
        },
      ],
    }).compileComponents();
    cartVoucherService = TestBed.inject(CartVoucherFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360CouponComponent);
    component = fixture.componentInstance;
    context = TestBed.inject(AsmCustomer360SectionContextSource);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error message alert at init', () => {
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should get current cartId at init', () => {
    expect(component.currentCartId).toEqual(mockCart.code);
  });

  it('should get userId at init', () => {
    expect(component.userId).toEqual(mockUserId);
  });

  it('should be able to reload coupon list', () => {
    component.refreshComponent();
    component.entries$.subscribe((entries) => {
      expect(entries).toEqual(mockReloadedCouponList.coupons);
    });
  });

  it('should be able to fetch coupon list from context data', () => {
    context.data$.next(mockCouponList);
    component.fetchCoupons();
    component.entries$.subscribe((entries) => {
      expect(entries).toEqual(mockCouponList.coupons);
      expect(component.showErrorAlert$.getValue()).toBe(false);
    });
  });

  it('should be able to apply coupon to cart and refresh coupon status', () => {
    spyOn(cartVoucherService, 'addVoucher').and.stub();
    const couponEntry = mockCouponList.coupons[1];
    expect(couponEntry.applied).toBe(false);
    component.applyCouponToCustomer(couponEntry);
    expect(cartVoucherService.addVoucher).toHaveBeenCalled();
    component.entries$.subscribe((entries) => {
      expect(entries[1].applied).toBe(true);
    });
  });

  it('should be able to remove coupon to cart and refresh coupon status', () => {
    spyOn(cartVoucherService, 'removeVoucher').and.stub();
    const couponEntry = mockCouponList.coupons[0];
    expect(couponEntry.applied).toBe(true);
    component.removeCouponToCustomer(couponEntry);
    expect(cartVoucherService.removeVoucher).toHaveBeenCalled();
    component.entries$.subscribe((entries) => {
      expect(entries[0].applied).toBe(false);
    });
  });

  it('should reload coupon list when applying coupon failed', () => {
    spyOn(cartVoucherService, 'getAddVoucherResultError').and.returnValue(
      of(true)
    );
    spyOn(component, 'refreshComponent').and.callThrough();
    component.ngOnInit();
    cartVoucherService.getAddVoucherResultError();
    expect(component.refreshComponent).toHaveBeenCalled();
  });

  it('should close error message alert of loading data when click close button', () => {
    component.showErrorAlert$.next(true);
    component.closeErrorAlert();
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should close error message alert of applying action when click close button', () => {
    component.showErrorAlertForApplyAction$.next(true);
    component.closeErrorAlertForApplyAction();
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
