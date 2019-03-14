import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Order } from '@spartacus/core';

import { of } from 'rxjs';

import { OrderDetailHeadlineComponent } from './order-detail-headline.component';
import { OrderDetailsService } from '../order-details.service';

const mockOrder: Order = {
  code: '1',
  statusDisplay: 'Shipped',
  deliveryAddress: {
    firstName: 'John',
    lastName: 'Smith',
    line1: 'Buckingham Street 5',
    line2: '1A',
    phone: '(+11) 111 111 111',
    postalCode: 'MA8902',
    town: 'London',
    country: {
      isocode: 'UK'
    }
  },
  deliveryMode: {
    name: 'Standard order-detail-shipping',
    description: '3-5 days'
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      line1: 'Buckingham Street 5',
      line2: '1A',
      phone: '(+11) 111 111 111',
      postalCode: 'MA8902',
      town: 'London',
      country: {
        isocode: 'UK'
      }
    }
  },
  created: new Date('2019-02-11T13:02:58+0000')
};

describe('OrderDetailHeadlineComponent', () => {
  let component: OrderDetailHeadlineComponent;
  let fixture: ComponentFixture<OrderDetailHeadlineComponent>;
  let mockOrderDetailsService: OrderDetailsService;
  let el: DebugElement;

  beforeEach(async(() => {
    mockOrderDetailsService = <OrderDetailsService>{
      getOrderDetails() {
        return of(mockOrder);
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: OrderDetailsService, useValue: mockOrderDetailsService }
      ],
      declarations: [OrderDetailHeadlineComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailHeadlineComponent);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    fixture.detectChanges();
    let order: Order;
    component.order$
      .subscribe(value => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
  });

  it('should order details info bar be not null', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-header.row'))).toBeTruthy();
  });

  it('should order details display correct order ID', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-detail:first-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.code);
  });

  it('should order details display correct order date', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header div:nth-child(2) > div.cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual('Feb 11, 2019');
  });

  it('should order details display correct order status', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-detail:last-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.statusDisplay);
  });
});
