import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  CartService,
  I18nTestingModule,
  CartVoucherService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { OrderSummaryComponent } from '../../../../cms-components/cart/cart-shared/order-summary/order-summary.component';
import { AppliedCouponsComponent } from '../../../cart/cart-coupon/applied-coupons/applied-coupons.component';
import { ICON_TYPE } from '../../../misc/icon';
import { PromotionsComponent } from '../promotions/promotions.component';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('CheckoutOrderSummaryComponent', () => {
  let component: CheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<CheckoutOrderSummaryComponent>;
  let mockCartService: any;

  beforeEach(async(() => {
    mockCartService = {
      getActive(): BehaviorSubject<Cart> {
        return new BehaviorSubject({
          totalItems: 5141,
          subTotal: { formattedValue: '11119' },
        });
      },
      loadDetails: createSpy(),
    };
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        CheckoutOrderSummaryComponent,
        OrderSummaryComponent,
        PromotionsComponent,
        AppliedCouponsComponent,
        MockCxIconComponent,
        MockFeatureLevelDirective,
      ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: CartVoucherService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
