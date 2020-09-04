import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Order, ReplenishmentOrder } from '@spartacus/core';
import { Observable, of } from 'rxjs';
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
  created: new Date('2019-02-11T13:02:58+0000'),
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  firstDate: '1994-01-11T13:02Z',
  trigger: {
    activationTime: '1994-02-24T13:02Z',
    displayTimeTable: 'every-test-date',
  },
  paymentType: {
    code: 'test-type',
    displayName: 'test-type-name',
  },
  costCenter: {
    name: 'Rustic Global',
    unit: {
      name: 'Rustic',
    },
  },
};

class MockOrderDetailsService {
  getOrderDetails(): Observable<any> {
    return of(mockOrder);
  }
}

describe('OrderDetailHeadlineComponent', () => {
  let component: OrderDetailHeadlineComponent;
  let fixture: ComponentFixture<OrderDetailHeadlineComponent>;
  let orderDetailsService: OrderDetailsService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
      ],
      declarations: [OrderDetailHeadlineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailHeadlineComponent);
    orderDetailsService = TestBed.inject(OrderDetailsService);
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

  describe('when replenishmentOrderCode is NOT defined', () => {
    it('should render one row of order detail headline', () => {
      fixture.detectChanges();
      expect(el.query(By.css('.cx-header:nth-of-type(1)'))).toBeTruthy();
      expect(el.query(By.css('.cx-header:nth-of-type(2)'))).toBeFalsy();
    });

    it('should order details display correct order ID', () => {
      fixture.detectChanges();
      const element: DebugElement = el.query(
        By.css(
          '.cx-header:nth-of-type(1) .cx-detail:first-of-type .cx-detail-value'
        )
      );
      expect(element.nativeElement.textContent).toEqual(mockOrder.code);
    });

    it('should order details display correct order date', () => {
      fixture.detectChanges();
      const element: DebugElement = el.query(
        By.css(
          '.cx-header:nth-of-type(1) div:nth-child(2) > div.cx-detail-value'
        )
      );
      expect(element.nativeElement.textContent).toEqual('Feb 11, 2019');
    });

    it('should order details display correct order status', () => {
      fixture.detectChanges();
      const element: DebugElement = el.query(
        By.css(
          '.cx-header:nth-of-type(1) .cx-detail:last-of-type .cx-detail-value'
        )
      );
      expect(element.nativeElement.textContent).toContain(
        mockOrder.statusDisplay
      );
    });
  });

  describe('when replenishmentOrderCode is defined', () => {
    it('should render two rows of order detail headline', () => {
      spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
        of(mockReplenishmentOrder)
      );

      fixture.detectChanges();
      expect(el.query(By.css('.cx-header:nth-of-type(1)'))).toBeTruthy();
      expect(el.query(By.css('.cx-header:nth-of-type(2)'))).toBeTruthy();
    });

    describe('first row of order detail headline', () => {
      it('should display correct replenishment number', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of(mockReplenishmentOrder)
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(1) .cx-detail:first-of-type .cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toEqual(
          mockReplenishmentOrder.replenishmentOrderCode
        );
      });

      it('should display when the replenishment date first started', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of(mockReplenishmentOrder)
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(1) div:nth-child(2) > div.cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toEqual('Jan 11, 1994');
      });

      it('should display next order date when active is true (replenishment is not cancelled)', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of(mockReplenishmentOrder)
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(1) .cx-detail:last-of-type .cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toContain('Feb 24, 1994');
      });

      it('should display cancelled in order date when active is false (replenishment is cancelled)', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of({ ...mockReplenishmentOrder, active: false })
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(1) .cx-detail:last-of-type .cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toContain(
          'orderDetails.cancelled'
        );
      });
    });
    describe('second row of order detail headline', () => {
      it('should display correct purchase order number', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of(mockReplenishmentOrder)
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(2) .cx-detail:first-of-type .cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toContain(
          mockReplenishmentOrder.purchaseOrderNumber
        );
      });

      it('should display none when no purchase order number is found', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of({ ...mockReplenishmentOrder, purchaseOrderNumber: '' })
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(2) .cx-detail:first-of-type .cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toContain(
          'orderDetails.emptyPurchaseOrderId'
        );
      });

      it('should display the correct frequency', () => {
        spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
          of(mockReplenishmentOrder)
        );

        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css(
            '.cx-header:nth-of-type(2) div:nth-child(2) > div.cx-detail-value'
          )
        );
        expect(element.nativeElement.textContent).toContain(
          mockReplenishmentOrder.trigger.displayTimeTable
        );
      });

      it('should display empty slot', () => {
        fixture.detectChanges();
        const element: DebugElement = el.query(
          By.css('.cx-header:nth-of-type(2) .cx-detail:last-of-type')
        );
        expect(element).toBeDefined();
        expect(element).toBeNull();
      });
    });
  });
});
