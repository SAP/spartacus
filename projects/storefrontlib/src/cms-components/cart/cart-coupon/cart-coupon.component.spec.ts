import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {
  CartService,
  I18nTestingModule,
  Voucher,
  Cart,
  CartVoucherService,
  AuthService,
  CustomerCouponService,
  CustomerCouponSearchResult,
  FeaturesConfig,
  FeaturesConfigModule,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CartCouponComponent } from './cart-coupon.component';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

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

  const mockCartService = jasmine.createSpyObj('CartService', [
    'getActive',
    'getLoaded',
  ]);

  const mockAuthService = jasmine.createSpyObj('AuthService', ['getOccUserId']);

  const mockCartVoucherService = jasmine.createSpyObj('CartVoucherService', [
    'addVoucher',
    'getAddVoucherResultSuccess',
    'resetAddVoucherProcessingState',
    'getAddVoucherResultLoading',
    'getAddVoucherResultError',
  ]);

  const mockCustomerCouponService = jasmine.createSpyObj(
    'CustomerCouponService',
    ['loadCustomerCoupons', 'getCustomerCoupons']
  );

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, FeaturesConfigModule],
      declarations: [
        CartCouponComponent,
        MockAppliedCouponsComponent,
        MockCxIconComponent,
      ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: CartVoucherService, useValue: mockCartVoucherService },
        { provide: CustomerCouponService, useValue: mockCustomerCouponService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.5' },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    mockCartService.getActive.and.returnValue(
      of<Cart>({ code: '123' })
    );
    mockCartService.getLoaded.and.returnValue(of(true));
    mockAuthService.getOccUserId.and.returnValue(of('testUserId'));
    mockCartVoucherService.getAddVoucherResultSuccess.and.returnValue(of());
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(of());
    mockCartVoucherService.addVoucher.and.stub();
    mockCartVoucherService.resetAddVoucherProcessingState.and.stub();
    mockCartVoucherService.resetAddVoucherProcessingState.calls.reset();
    mockCartVoucherService.getAddVoucherResultError.and.returnValue(of());
    mockCustomerCouponService.loadCustomerCoupons.and.stub();
    mockCustomerCouponService.getCustomerCoupons.and.returnValue(of({}));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show coupon input and submit button', () => {
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(
      of(false)
    );
    fixture.detectChanges();

    expect(el.query(By.css('.cx-cart-coupon-title'))).toBeTruthy();
    expect(el.query(By.css('.input-coupon-code'))).toBeTruthy();
    expect(el.query(By.css('.apply-coupon-button'))).toBeTruthy();
    expect(
      el.query(By.css('.apply-coupon-button')).nativeElement.disabled
    ).toBeTruthy();
  });

  it('should form is valid when inputting coupon code', () => {
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
  });

  it('should enable button when inputting coupon code', () => {
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(
      of(false)
    );
    fixture.detectChanges();

    const applyBtn = el.query(By.css('.apply-coupon-button')).nativeElement;
    expect(applyBtn.disabled).toBeTruthy();

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(applyBtn.disabled).toBeFalsy();
  });

  it('should disable button when coupon is in process', () => {
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(
      hot('-a', { a: true })
    );
    fixture.detectChanges();

    const applyBtn = el.query(By.css('.apply-coupon-button')).nativeElement;

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(
      cold('-a', { a: true })
    );
    applyBtn.click();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(mockCartVoucherService.addVoucher).toHaveBeenCalled();
    expect(applyBtn.disabled).toBeTruthy();
  });

  it('should coupon is applied successfully', () => {
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(of(true));
    mockCartVoucherService.getAddVoucherResultSuccess.and.returnValue(of(true));

    fixture.detectChanges();

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'couponCode1';
    el.query(By.css('.apply-coupon-button')).nativeElement.click();

    expect(
      el.query(By.css('.apply-coupon-button')).nativeElement.disabled
    ).toBeTruthy();
    expect(input.readOnly).toBeFalsy();
  });

  it('should disable button when apply coupon failed', () => {
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(
      of(false)
    );
    mockCartVoucherService.getAddVoucherResultSuccess.and.returnValue(
      of(false)
    );
    fixture.detectChanges();

    input = el.query(By.css('.input-coupon-code')).nativeElement;
    expect(input.readOnly).toBeFalsy();

    const button = el.query(By.css('.apply-coupon-button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should not list customer coupons when no customer coupons', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.cx-customer-coupons a')).length
    ).toEqual(0);
  });

  it('should list customer coupons when has customer coupons', () => {
    mockCustomerCouponService.getCustomerCoupons.and.returnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.click();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.cx-customer-coupons a')).length
    ).toEqual(2);
    expect(
      fixture.debugElement.queryAll(By.css('.couponbox-is-active'))
    ).toBeTruthy();
  });

  it('should filter customer coupons', () => {
    mockCustomerCouponService.getCustomerCoupons.and.returnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    input = el.query(By.css('.input-coupon-code')).nativeElement;
    input.value = 'coupon2';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.cx-customer-coupons a')).length
    ).toEqual(1);

    const customerCouponResult = el.query(
      By.css('.cx-customer-coupons .coupon-id')
    ).nativeElement;
    expect((<HTMLElement>customerCouponResult).innerText).toEqual(
      'CustomerCoupon2'
    );
  });

  it('should not show applied customer coupon', () => {
    mockCartService.getActive.and.returnValue(
      of<Cart>({ appliedVouchers: appliedVouchers })
    );
    mockCustomerCouponService.getCustomerCoupons.and.returnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.cx-customer-coupons a')).length
    ).toEqual(1);
  });

  it('should apply customer coupons', () => {
    mockCustomerCouponService.getCustomerCoupons.and.returnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    const customerCoupon = el.queryAll(By.css('.cx-customer-coupons a'))[0]
      .nativeElement;
    customerCoupon.click();
    fixture.detectChanges();
    expect(mockCartVoucherService.addVoucher).toHaveBeenCalled();
  });

  it('should reload customer coupons on apply error', () => {
    mockCartVoucherService.getAddVoucherResultError.and.returnValue(of(true));
    fixture.detectChanges();
    expect(mockCustomerCouponService.loadCustomerCoupons).toHaveBeenCalled();
  });

  it('should reset state when ondestory is triggered', () => {
    mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(of(true));
    mockCartVoucherService.getAddVoucherResultSuccess.and.returnValue(of(true));
    fixture.detectChanges();

    component.ngOnDestroy();
    expect(
      mockCartVoucherService.resetAddVoucherProcessingState
    ).toHaveBeenCalled();
  });
});
