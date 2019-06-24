import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCouponAnchorComponent } from './cart-coupon-anchor.component';

describe('CartCouponAnchorComponent', () => {
  let component: CartCouponAnchorComponent;
  let fixture: ComponentFixture<CartCouponAnchorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCouponAnchorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
