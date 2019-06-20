import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nTestingModule, Order, PromotionResult, UserOrderService } from '@spartacus/core';
import { of } from 'rxjs';
import { CardModule } from '../../../../../shared/components/card/card.module';
import { ModalService } from '../../../../../shared/components/modal/index';
import { OrderDetailsService } from '../order-details.service';
import { OrderDetailItemsComponent } from './order-detail-items.component';

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
  consignments: [
    {
      code: 'a00000341',
      status: 'SHIPPED',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: {}, quantity: 1, shippedQuantity: 1 }],
    },
  ],
};

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input()
  isReadOnly = false;
  @Input()
  hasHeader = true;
  @Input()
  items = [];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
  @Input()
  cartIsLoading = false;
}

describe('OrderDetailItemsComponent', () => {
  let component: OrderDetailItemsComponent;
  let fixture: ComponentFixture<OrderDetailItemsComponent>;
  let mockOrderDetailsService: OrderDetailsService;
  let el: DebugElement;
  let modalInstance: any;

  const userOrderService = jasmine.createSpyObj('UserOrderService', [
    'getConsignmentTracking',
    'loadConsignmentTracking',
  ]);

  beforeEach(async(() => {
    mockOrderDetailsService = <OrderDetailsService>{
      getOrderDetails() {
        return of(mockOrder);
      },
    };

    TestBed.configureTestingModule({
      imports: [CardModule, I18nTestingModule, NgbModule],
      providers: [
        { provide: OrderDetailsService, useValue: mockOrderDetailsService },
        { provide: UserOrderService, useValue: userOrderService },
        { provide: ModalService, useValue: { open: () => {} } },
      ],
      declarations: [OrderDetailItemsComponent, MockCartItemListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailItemsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    userOrderService.getConsignmentTracking.and.returnValue(
      of({ trackingID: '1234567890' })
    );
    userOrderService.loadConsignmentTracking.and.callFake(
      (_orderCode: string, _consignmentCode: string) => {}
    );
    modalInstance = TestBed.get(ModalService);
    spyOn(modalInstance, 'open').and.returnValue({ componentInstance: {} });
  });

  it('should create', () => {
    fixture.detectChanges();
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

  it('should order details item be rendered', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.cx-list'))).toBeTruthy();
  });

  it('should display tracking package button', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.btn'))).toBeTruthy();
  });

  it('should not display tracking package button', () => {
    const order: Order = mockOrder;
    order.consignments[0].status = 'WAITING';
    component.order$ = of(order);
    fixture.detectChanges();
    expect(el.query(By.css('.btn'))).toBeFalsy();
  });

  it('should be able to open dialog', () => {
    component.orderCode = mockOrder.code;
    component.openTrackingDialog(mockOrder.consignments[0]);
    const modalRef = component.modalRef;
    fixture.detectChanges();

    expect(userOrderService.loadConsignmentTracking).toHaveBeenCalledWith(
      component.orderCode,
      mockOrder.consignments[0].code
    );
    expect(modalInstance.open).toHaveBeenCalled();
    expect(modalRef.componentInstance.shipDate).toEqual(
      mockOrder.consignments[0].statusDate
    );
    modalRef.componentInstance.tracking$.subscribe(c =>
      expect(c.trackingID).toEqual('1234567890')
    );
  });
});
