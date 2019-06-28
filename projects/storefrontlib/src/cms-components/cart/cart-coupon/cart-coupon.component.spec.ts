import { Component, EventEmitter, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Cart, CartService, I18nTestingModule, Voucher } from '@spartacus/core';
import { of } from 'rxjs';
import { CartCouponAnchorService } from './cart-coupon-anchor/cart-coupon-anchor.service';
import { CartCouponComponent } from './cart-coupon.component';

const coupon1: Voucher = { code: 'coupon1' };
const coupon2: Voucher = { code: 'coupon2' };
const cart: Cart = {
  code: 'xxx',
  appliedVouchers: [coupon1, coupon2],
};

@Component({
  selector: 'cx-icon',
  template: '',
})
export class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-applied-coupons',
  template: '',
})
export class MockAppliedCouponsComponent {
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
  let cartCouponAnchorService;
  let submit;
  let input: HTMLInputElement;
  const emitter = new EventEmitter<string>();

  const mockCartService = jasmine.createSpyObj('CartService', [
    'addVoucher',
    'getAddVoucherResultSuccess',
    'resetAddVoucherProcessingState',
    'getAddVoucherResultError',
    'getAddVoucherResultLoading',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [
        CartCouponComponent,
        MockAppliedCouponsComponent,
        MockCxIconComponent,
      ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        CartCouponAnchorService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    component.cart = cart;

    cartCouponAnchorService = TestBed.get(CartCouponAnchorService);
    spyOn(cartCouponAnchorService, 'getEventEmit').and.returnValue(emitter);

    submit = fixture.debugElement.query(By.css('button')).nativeElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    mockCartService.getAddVoucherResultSuccess.and.returnValue(of());
    mockCartService.getAddVoucherResultError.and.returnValue(of());
    mockCartService.getAddVoucherResultLoading.and.returnValue(of());
    mockCartService.addVoucher.and.stub();
    mockCartService.resetAddVoucherProcessingState.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display applied coupons', () => {
    fixture.detectChanges();
    const appliedCoupons = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-applied-coupons'
    );
    expect(appliedCoupons.length).toBe(1);
  });

  it('should display cart coupon label and apply button disable by default', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.cx-cart-coupon-title'))
      .nativeElement.innerText;

    expect(title).toEqual('voucher.coupon');
    expect(submit.disabled).toBe(true);
  });

  it('should call getAddVoucherResultSuccess in ngOnInit', () => {
    mockCartService.getAddVoucherResultSuccess.and.returnValue(of(true));
    fixture.detectChanges();
    expect(mockCartService.getAddVoucherResultSuccess).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
  });

  it('should call resetAddVoucherProcessingState in ngOnDestroy', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
  });

  it('should disable button when applied voucher successfully and cart is loading', () => {
    fixture.detectChanges();
    expect(submit.disabled).toBe(true);

    mockCartService.addVoucher.and.callFake(() => {
      component.onSuccess(true);
    });
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submit.disabled).toBe(false);

    submit.click();
    component.cartIsLoading = true;
    fixture.detectChanges();
    expect(input.value).toBe('');
    expect(mockCartService.addVoucher).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
    expect(submit.disabled).toBe(true);
  });

  it('should disable button when applied voucher successfully and cart is loaded', () => {
    fixture.detectChanges();
    expect(submit.disabled).toBe(true);

    mockCartService.addVoucher.and.callFake(() => {
      component.onSuccess(true);
    });
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submit.disabled).toBe(false);

    submit.click();
    fixture.detectChanges();
    expect(input.value).toBe('');
    expect(mockCartService.addVoucher).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
    expect(submit.disabled).toBe(true);
  });

  it('should disable button when applied voucher failed and cart is loading', () => {
    fixture.detectChanges();
    expect(submit.disabled).toBe(true);

    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submit.disabled).toBe(false);

    submit.click();
    component.cartIsLoading = true;
    fixture.detectChanges();
    expect(input.value).toBe('couponCode1');
    expect(mockCartService.addVoucher).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
    expect(submit.disabled).toBe(true);
  });

  it('should enable button when applied voucher failed and cart is loaded', () => {
    fixture.detectChanges();
    expect(submit.disabled).toBe(true);

    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submit.disabled).toBe(false);

    submit.click();
    fixture.detectChanges();
    expect(input.value).toBe('couponCode1');
    expect(mockCartService.addVoucher).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
    expect(submit.disabled).toBe(false);
  });

  it('should scroll to view when receive the event', () => {
    spyOn(component, 'scrollToView').and.stub();
    fixture.detectChanges();

    cartCouponAnchorService.getEventEmit().emit('#applyVoucher');
    expect(component.scrollToView).toHaveBeenCalledWith('#applyVoucher');
  });
});
