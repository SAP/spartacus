import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';
import { OutletModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailTotalsComponent } from './order-detail-totals.component';

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

describe('OrderDetailTotalsComponent', () => {
  let component: OrderDetailTotalsComponent;
  let fixture: ComponentFixture<OrderDetailTotalsComponent>;
  let mockOrderDetailsService: OrderDetailsService;

  beforeEach(
    waitForAsync(() => {
      mockOrderDetailsService = <OrderDetailsService>{
        getOrderDetails() {
          return of(mockOrder);
        },
      };

      TestBed.configureTestingModule({
        imports: [OutletModule],
        providers: [
          { provide: OrderDetailsService, useValue: mockOrderDetailsService },
        ],
        declarations: [OrderDetailTotalsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailTotalsComponent);

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
});
