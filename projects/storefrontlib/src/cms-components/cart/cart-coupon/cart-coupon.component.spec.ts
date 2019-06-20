import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Cart, CartService, I18nTestingModule, Voucher } from '@spartacus/core';
import { of } from 'rxjs';
import { CartCouponComponent } from './cart-coupon.component';
import createSpy = jasmine.createSpy;

const coupon1: Voucher = { code: 'coupon1' };
const coupon2: Voucher = { code: 'coupon2' };
const cart: Cart = {
  code: 'xxx',
  appliedVouchers: [coupon1, coupon2],
};

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;
  let mockCartService: any;
  let form: DebugElement;
  let submit: DebugElement;

  beforeEach(async(() => {
    mockCartService = {
      applyVoucher: createSpy(),
      removeVoucher: createSpy(),
      getAddVoucherResultSuccess: createSpy().and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [CartCouponComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    component.cart = cart;
    form = fixture.debugElement.query(By.css('form'));
    submit = fixture.debugElement.query(By.css('[type="submit"]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid on init', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should applyVoucher() to be defined', () => {
    expect(component.applyVoucher).toBeDefined();
  });

  it('should call applyVoucher() method on submit', () => {
    const request = spyOn(component, 'applyVoucher');
    const input = component.form.controls['couponCode'];
    input.setValue('couponCode1');
    fixture.detectChanges();
    form.triggerEventHandler('submit', null);
    expect(request).toHaveBeenCalled();
  });

  it('should removeVoucher() to be defined', () => {
    expect(component.removeVoucher).toBeDefined();
  });

  it('should submit button be enabled when form is invalid', () => {
    const input = component.form.controls['couponCode'];
    input.setValue('couponCode1');
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
    expect(submit.nativeElement.disabled).toBeFalsy();
  });
});
