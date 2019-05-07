import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { UICart, CartService, I18nTestingModule } from '@spartacus/core';
import { OrderSummaryComponent } from '../../../../../cms-components/checkout/cart/cart-shared/order-summary/order-summary.component';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import { PromotionsComponent } from '../../promotions/promotions.component';

import createSpy = jasmine.createSpy;

describe('CheckoutOrderSummaryComponent', () => {
  let component: CheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<CheckoutOrderSummaryComponent>;
  let mockCartService: any;

  beforeEach(async(() => {
    mockCartService = {
      getActive(): BehaviorSubject<UICart> {
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
      ],
      providers: [{ provide: CartService, useValue: mockCartService }],
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
