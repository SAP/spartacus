import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Cart, CartVoucherFacade, Voucher } from '@spartacus/cart/base/root';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { AppliedCouponsComponent } from '../../cart-coupon/applied-coupons/applied-coupons.component';
import { OrderSummaryComponent } from './order-summary.component';

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

const mockCart: Cart = {
  code: 'test cart',
};

const context$ = of(mockCart);

describe('OrderSummary', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrderSummaryComponent],
      providers: [
        { provide: CartVoucherFacade, useValue: {} },
        {
          provide: OutletContextData,
          useValue: { context$ },
        },
      ],
    })
      .overrideComponent(OrderSummaryComponent, {
        remove: { imports: [TranslatePipe, AppliedCouponsComponent] },
        add: { imports: [MockTranslatePipe, MockAppliedCouponsComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart from outlet context data', () => {
    component.ngOnInit();
    expect(component.cart).toEqual(mockCart);
  });
});
