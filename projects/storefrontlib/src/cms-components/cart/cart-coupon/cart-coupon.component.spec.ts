import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCouponComponent } from './cart-coupon.component';

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartCouponComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});