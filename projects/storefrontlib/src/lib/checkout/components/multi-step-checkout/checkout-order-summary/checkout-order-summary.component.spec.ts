import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSummaryComponent } from 'projects/storefrontlib/src/lib/cart';
import { PromotionsComponent } from '../../promotions/promotions.component';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartService, I18nTestingModule } from '@spartacus/core';

import createSpy = jasmine.createSpy;

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
