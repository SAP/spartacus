import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Customer360CouponList,
  Customer360Facade,
  Customer360Response,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule, UserIdService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerCouponComponent } from './asm-customer-coupon.component';
import {
  ActiveCartFacade,
  Cart,
  CartVoucherFacade,
} from '@spartacus/cart/base/root';
import { AsmCustomerPromotionListingComponent } from '../../asm-customer-promotion-listing/asm-customer-promotion-listing.component';

describe('AsmCustomerCouponComponent', () => {
  let cartVoucherService: CartVoucherFacade;
  let component: AsmCustomerCouponComponent;
  let fixture: ComponentFixture<AsmCustomerCouponComponent>;
  let context: Customer360SectionContextSource<Customer360CouponList>;
  const mockCart: Cart = {
    code: 'cartId',
  };
  const mockCouponList: Customer360CouponList = {
    type: Customer360Type.COUPON_LIST,
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
  const mockReloadedCouponList: Customer360CouponList = {
    type: Customer360Type.COUPON_LIST,
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
  const mockReloadedCustomer360Response: Customer360Response = {
    value: [mockReloadedCouponList],
  };
  class MockCustomer360Facade implements Partial<Customer360Facade> {
    get360Data(): Observable<Customer360Response> {
      return of(mockReloadedCustomer360Response);
    }
  }
  class MockCartVoucherFacade implements Partial<CartVoucherFacade> {
    getAddVoucherResultError(): Observable<boolean> {
      return of(true);
    }

    getDeleteVoucherResultError(): Observable<boolean> {
      return of(true);
    }

    addVoucher(_voucherId: string, _cartId?: string | undefined): void {}

    removeVoucher(_voucherId: string, _cartId?: string | undefined): void {}
  }
  class MockUserIdService implements Partial<UserIdService> {
    getUserId(): Observable<string> {
      return of('userId');
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
        AsmCustomerCouponComponent,
        AsmCustomerPromotionListingComponent,
      ],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
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
          provide: Customer360Facade,
          useClass: MockCustomer360Facade,
        },
      ],
    }).compileComponents();
    cartVoucherService = TestBed.inject(CartVoucherFacade);
  });

  beforeEach(() => {
    // spyOn(cartVoucherService, 'getDeleteVoucherResultError').and.returnValue(of(true));
    fixture = TestBed.createComponent(AsmCustomerCouponComponent);
    component = fixture.componentInstance;
    context = TestBed.inject(Customer360SectionContextSource);
    // context.data$.next(mockCouponList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch coupon list from context at init', () => {
    component.entries$.subscribe((value) => {
      expect(value).toEqual(mockCouponList.coupons);
    });
  });

  it('should not display error message alert at init', () => {
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(false);
    });
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

  it('should show error message alert when applying coupon action failed', () => {
    spyOn(cartVoucherService, 'getAddVoucherResultError').and.returnValue(
      of(true)
    );
    spyOn(cartVoucherService, 'addVoucher').and.callThrough();
    const couponEntry = mockCouponList.coupons[0];
    component.applyCouponToCustomer(couponEntry);
    expect(cartVoucherService.getAddVoucherResultError).toHaveBeenCalled();
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should show error message alert when removing coupon action failed', () => {
    spyOn(cartVoucherService, 'getDeleteVoucherResultError').and.callThrough();
    const couponEntry = mockCouponList.coupons[1];
    component.removeCouponToCustomer(couponEntry);
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(true);
    });
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
