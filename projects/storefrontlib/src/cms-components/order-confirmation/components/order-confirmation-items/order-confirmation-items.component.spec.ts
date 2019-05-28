import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService, I18nTestingModule, Order } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Item } from '../../../../cms-components/checkout/cart/index';
import { OrderConfirmationItemsComponent } from './order-confirmation-items.component';

import createSpy = jasmine.createSpy;
import { By } from '@angular/platform-browser';
@Component({ selector: 'cx-cart-item-list', template: '' })
class MockReviewSubmitComponent {
  @Input()
  items: Item[];
  @Input()
  isReadOnly: boolean;
}

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        OrderConfirmationItemsComponent,
        MockReviewSubmitComponent,
      ],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should display items', () => {
    const items = () => fixture.debugElement.query(By.css('cx-cart-item-list'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(items()).toBeTruthy();
  });
});
