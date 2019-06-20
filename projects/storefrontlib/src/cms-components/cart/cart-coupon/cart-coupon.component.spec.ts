import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
