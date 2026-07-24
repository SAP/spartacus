import { vi } from 'vitest';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  ActiveCartFacade,
  Cart,
  CartVoucherFacade,
  Voucher,
} from '@spartacus/cart/base/root';
import {
  CustomerCouponSearchResult,
  CustomerCouponService,
  MockTranslatePipe,
  MockTranslationService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { EMPTY, of } from 'rxjs';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';
import { CartCouponComponent } from './cart-coupon.component';

@Component({
  selector: 'cx-applied-coupons',
  template: '',
})
class MockAppliedCouponsComponent {
  @Input()
  vouchers: Voucher[];
  @Input()
  cartIsLoading = false;
  @Input()
  isReadOnly = false;
}

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;
  let input: HTMLInputElement;
  let el: DebugElement;

  const mockActiveCartService = {
    getActive: vi.fn(),
    getActiveCartId: vi.fn(),
    isStable: vi.fn(),
  };

  const mockCartVoucherService = {
    addVoucher: vi.fn(),
    getAddVoucherResultSuccess: vi.fn(),
    resetAddVoucherProcessingState: vi.fn(),
    getAddVoucherResultLoading: vi.fn(),
    getAddVoucherResultError: vi.fn(),
  };

  const mockCustomerCouponService = { loadCustomerCoupons: vi.fn(), getCustomerCoupons: vi.fn() };

  const couponsSearchResult: CustomerCouponSearchResult = {
    coupons: [
      {
        couponId: 'CustomerCoupon1',
      },
      {
        couponId: 'CustomerCoupon2',
      },
    ],
  };

  const appliedVouchers: Voucher[] = [{ code: 'CustomerCoupon1' }];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormErrorsModule, CartCouponComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartService },
        { provide: CartVoucherFacade, useValue: mockCartVoucherService },
        {
          provide: CustomerCouponService,
          useValue: mockCustomerCouponService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(CartCouponComponent, {
        remove: { imports: [TranslatePipe, AppliedCouponsComponent] },
        add: { imports: [MockTranslatePipe, MockAppliedCouponsComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    mockActiveCartService.getActive.mockReturnValue(
      of({ code: '123' } as Cart)
    );
    mockActiveCartService.getActiveCartId.mockReturnValue(of('123'));
    mockActiveCartService.isStable.mockReturnValue(of(true));
    mockCartVoucherService.getAddVoucherResultSuccess.mockReturnValue(EMPTY);
    mockCartVoucherService.getAddVoucherResultLoading.mockReturnValue(EMPTY);
    mockCartVoucherService.addVoucher.mockImplementation(() => {});
    mockCartVoucherService.resetAddVoucherProcessingState.mockImplementation(() => {});
    mockCartVoucherService.resetAddVoucherProcessingState.mockClear();
    mockCartVoucherService.getAddVoucherResultError.mockReturnValue(EMPTY);
    mockCustomerCouponService.loadCustomerCoupons.mockImplementation(() => {});
    mockCustomerCouponService.getCustomerCoupons.mockReturnValue(of({}));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show coupon input and submit button', () => {
    mockCartVoucherService.getAddVoucherResultLoading.mockReturnValue(
      of(false)
    );
    fixture.detectChanges();

    expect(el.query(By.css('.cx-cart-coupon-title'))).toBeTruthy();
    expect(el.query(By.css('.input-coupon-code'))).toBeTruthy();
    expect(el.query(By.css('.apply-coupon-button'))).toBeTruthy();
    expect(el.query(By.css('.apply-coupon-button'))).toBeTruthy();
  });

  it('should form is valid when inputting coupon code', () => {
    fixture.detectChanges();
    expect(component.couponForm.valid).toBeFalsy();

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.couponForm.controls['couponCode'].value).toBe(
      'couponCode1'
    );
  });

  it('should disable button when coupon is in process', () => {
    mockCartVoucherService.getAddVoucherResultLoading.mockReturnValue(
      hot('-a', { a: true })
    );
    fixture.detectChanges();

    const applyBtn = el.query(By.css('.apply-coupon-button')).nativeElement;

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    mockCartVoucherService.getAddVoucherResultLoading.mockReturnValue(
      cold('-a', { a: true })
    );
    applyBtn.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(mockCartVoucherService.addVoucher).toHaveBeenCalled();
  });

  it('should coupon is applied successfully', () => {
    mockCartVoucherService.getAddVoucherResultLoading.mockReturnValue(of(true));
    mockCartVoucherService.getAddVoucherResultSuccess.mockReturnValue(of(true));

    fixture.detectChanges();

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    el.query(By.css('.apply-coupon-button')).nativeElement.click();
    expect(component.couponForm.controls['couponCode'].value).toBeNull();
  });

  it('should not list customer coupons when no customer coupons', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.cx-available-coupon')).length
    ).toEqual(0);
  });

  it('should list customer coupons when has customer coupons', () => {
    mockCustomerCouponService.getCustomerCoupons.mockReturnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.cx-available-coupon .title'))
        .length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.cx-available-coupon .message'))
        .length
    ).toEqual(1);
    expect(
      fixture.debugElement.queryAll(By.css('.cx-available-coupon .card')).length
    ).toEqual(2);
  });

  it('should not show applied customer coupon', () => {
    mockActiveCartService.getActive.mockReturnValue(
      of({ appliedVouchers: appliedVouchers } as Cart)
    );
    mockCustomerCouponService.getCustomerCoupons.mockReturnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.cx-available-coupon .card')).length
    ).toEqual(1);
  });

  it('should apply customer coupons', () => {
    mockCustomerCouponService.getCustomerCoupons.mockReturnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    const customerCoupon = el.queryAll(By.css('.cx-available-coupon .card'))[0]
      .nativeElement;
    customerCoupon.click();
    fixture.detectChanges();
    expect(mockCartVoucherService.addVoucher).toHaveBeenCalled();
  });

  it('should reload customer coupons on apply error', () => {
    mockCartVoucherService.getAddVoucherResultError.mockReturnValue(of(true));
    fixture.detectChanges();
    expect(mockCustomerCouponService.loadCustomerCoupons).toHaveBeenCalled();
  });

  it('should reset state when on destroy is triggered', () => {
    mockCartVoucherService.getAddVoucherResultLoading.mockReturnValue(of(true));
    mockCartVoucherService.getAddVoucherResultSuccess.mockReturnValue(of(true));
    fixture.detectChanges();

    component.ngOnDestroy();
    expect(
      mockCartVoucherService.resetAddVoucherProcessingState
    ).toHaveBeenCalled();
  });
});
