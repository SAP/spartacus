import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { PromotionsModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { OrderConfirmationItemsComponent } from './order-confirmation-items.component';

import createSpy = jasmine.createSpy;

class MockCheckoutService {
  clearCheckoutData = createSpy();

  getOrderDetails(): Observable<Order> {
    return of({
      entries: [
        {
          entryNumber: 1,
          quantity: 1,
        },
      ],
    });
  }
}

describe('OrderConfirmationItemsComponent', () => {
  let component: OrderConfirmationItemsComponent;
  let fixture: ComponentFixture<OrderConfirmationItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, PromotionsModule, FeaturesConfigModule],
        declarations: [OrderConfirmationItemsComponent],
        providers: [
          { provide: CheckoutFacade, useClass: MockCheckoutService },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.3' },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
