import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  CartService,
  I18nTestingModule,
  CartVoucherService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { PromotionsModule } from '../../../checkout';
import { CartCouponModule } from '../../cart-coupon/cart-coupon.module';
import { OrderSummaryComponent } from './order-summary.component';
import createSpy = jasmine.createSpy;

describe('OrderSummary', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let mockCartService: any;

  mockCartService = {
    getActive(): BehaviorSubject<Cart> {
      return new BehaviorSubject({
        totalItems: 5141,
        subTotal: { formattedValue: '11119' },
      });
    },
    loadDetails: createSpy(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PromotionsModule, I18nTestingModule, CartCouponModule],
      declarations: [OrderSummaryComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: CartVoucherService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
