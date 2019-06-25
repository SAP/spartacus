import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Cart, CartService, I18nTestingModule, Voucher } from '@spartacus/core';
import { of } from 'rxjs';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';
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

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;
  let form: DebugElement;
  let submit: DebugElement;

  const mockCartService = jasmine.createSpyObj('CartService', [
    'addVoucher',
    'getAddVoucherResultSuccess',
    'resetAddVoucherProcessingState',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [
        CartCouponComponent,
        AppliedCouponsComponent,
        MockCxIconComponent,
      ],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    component.cart = cart;
    form = fixture.debugElement.query(By.css('form'));
    submit = fixture.debugElement.query(By.css('[type="submit"]'));
    mockCartService.getAddVoucherResultSuccess.and.returnValue(of(true));
    mockCartService.addVoucher.and.stub();
    mockCartService.resetAddVoucherProcessingState.and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAddVoucherResultSuccess in ngOnInit', () => {
    expect(mockCartService.getAddVoucherResultSuccess).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
  });

  it('should call resetAddVoucherProcessingState in ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
  });

  it('should display cart coupon lebal and apply button disable by default', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-cart-coupon-title'));
    const cartName = el.nativeElement.innerText;
    expect(cartName).toEqual('voucher.couponLabel');
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(submit.nativeElement.enabled).toBeFalsy();
  });

  it('should submit button be disabled when form input is empty', () => {
    const input = component.form.controls['couponCode'];
    input.setValue('');
    component.cartIsLoading = false;
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(submit.nativeElement.enabled).toBeFalsy();
  });

  it('should submit button be disabled when cart is loading', () => {
    const input = component.form.controls['couponCode'];
    input.setValue('asds');
    component.cartIsLoading = true;
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    expect(submit.nativeElement.enabled).toBeFalsy();
  });

  it('should submit button be enabled when form input is not empty and cart loaded', () => {
    const input = component.form.controls['couponCode'];
    input.setValue('couponCode1');
    component.cartIsLoading = false;
    fixture.detectChanges();
    expect(component.form.invalid).toBeFalsy();
    expect(submit.nativeElement.disabled).toBeFalsy();
  });

  it('should call applyVoucher() method on submit when submit button is enabled', () => {
    const input = component.form.controls['couponCode'];
    component.cartIsLoading = false;
    input.setValue('couponCode1');
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(mockCartService.addVoucher).toHaveBeenCalled();
    expect(mockCartService.resetAddVoucherProcessingState).toHaveBeenCalled();
  });
});
