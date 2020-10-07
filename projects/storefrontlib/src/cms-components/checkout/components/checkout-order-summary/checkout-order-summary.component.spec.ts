import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  Cart,
  CartVoucherService,
  I18nTestingModule,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { OrderSummaryComponent } from '../../../../cms-components/cart/cart-shared/order-summary/order-summary.component';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { AppliedCouponsComponent } from '../../../cart/cart-coupon/applied-coupons/applied-coupons.component';
import { PromotionsComponent } from '../promotions/promotions.component';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import createSpy = jasmine.createSpy;

describe('CheckoutOrderSummaryComponent', () => {
  let component: CheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<CheckoutOrderSummaryComponent>;
  let mockActiveCartService: any;

  beforeEach(async(() => {
    mockActiveCartService = {
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
        MockFeatureLevelDirective,
      ],
      providers: [
        { provide: ActiveCartService, useValue: mockActiveCartService },
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
