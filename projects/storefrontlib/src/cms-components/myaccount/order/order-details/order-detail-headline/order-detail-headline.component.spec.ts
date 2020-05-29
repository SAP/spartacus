import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2BOrder, I18nTestingModule, Order } from '@spartacus/core';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailHeadlineComponent } from './order-detail-headline.component';



const mockOrder: Order = {
  code: '1',
  statusDisplay: 'orderDetails.statusDisplay context:Shipped',
  deliveryAddress: {
    firstName: 'John',
    lastName: 'Smith',
    line1: 'Buckingham Street 5',
    line2: '1A',
    phone: '(+11) 111 111 111',
    postalCode: 'MA8902',
    town: 'London',
    country: {
      isocode: 'UK',
    },
  },
  deliveryMode: {
    name: 'Standard order-detail-shipping',
    description: '3-5 days',
  },
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa',
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
        isocode: 'UK',
      },
    },
  },
  user: {
    name: 'Rivers'
  },
  created: new Date('2019-02-11T13:02:58+0000'),
};

const mockB2BOrder: B2BOrder = {
  costCenter: {
    name: 'Rustic Global'
  },
  orgCustomer:{
    orgUnit: {
      name: 'Rustic'
    }
  },
  purchaseOrderNumber: '123';
}

describe('OrderDetailHeadlineComponent', () => {
  let component: OrderDetailHeadlineComponent;
  let fixture: ComponentFixture<OrderDetailHeadlineComponent>;
  let mockOrderDetailsService: OrderDetailsService;
  let el: DebugElement;

  beforeEach(async(() => {
    mockOrderDetailsService = <OrderDetailsService>{
      getOrderDetails() {
        return of(mockOrder);
      },
    };

    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useValue: mockOrderDetailsService },
      ],
      declarations: [OrderDetailHeadlineComponent],
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
      .subscribe((value) => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
  });

  it('should render info bar', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-header.row'))).toBeTruthy();
  });

  it('should display correct order ID', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header:nth-of-type(1) .cx-detail:first-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual(mockOrder.code);
  });

  it('should display correct order date', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header:nth-of-type(1) div:nth-child(2) > div.cx-detail-value')
    );
    expect(element.nativeElement.textContent).toEqual('Feb 11, 2019');
  });

  it('should display correct order status', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header:nth-of-type(1) .cx-detail:last-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.statusDisplay
    );
  });

  it('should display correct purchase order number', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header:nth-of-type(2) .cx-detail:first-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toContain(
      mockB2BOrder.purchaseOrderNumber
    );
  });

  it('should display who ordered', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header:nth-of-type(2) div:nth-child(2) > div.cx-detail-value')
    );
    expect(element.nativeElement.textContent).toContain(
      mockOrder.user.name
    );
  });

  it('should display correct unit', () => {
    fixture.detectChanges();
    const element: DebugElement = el.query(
      By.css('.cx-header:nth-of-type(2) .cx-detail:last-of-type .cx-detail-value')
    );
    expect(element.nativeElement.textContent).toContain(
      mockB2BOrder.orgCustomer.orgUnit.name
    );
  });
});
