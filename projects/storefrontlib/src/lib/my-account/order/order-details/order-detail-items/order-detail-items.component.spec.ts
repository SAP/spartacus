import { Component, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  PromotionResult,
  Order,
  I18nTestingModule,
  UserService,
  ConsignmentTracking,
} from '@spartacus/core';
import { CardModule } from '../../../../ui/components/card/card.module';
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

class MockUserService {
  getConsignmentTracking(): Observable<ConsignmentTracking> {
    return of({ trackingID: '1234567890' });
  }
  loadConsignmentTracking(_orderCode: string, _consignmentCode: string): void {}
}

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
  let ngbModal: NgbModal;
  let userService: UserService;

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
        { provide: UserService, useClass: MockUserService },
        { provide: NgbModal, useValue: { open: () => {} } },
      ],
      declarations: [OrderDetailItemsComponent, MockCartItemListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailItemsComponent);
    el = fixture.debugElement;
    userService = TestBed.get(UserService);
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
    const modalRef = {
      componentInstance: {
        shipDate: null,
        tracking$: of<ConsignmentTracking>(),
      },
    };
    ngbModal = TestBed.get(NgbModal);
    spyOn(ngbModal, 'open').and.returnValue(modalRef);
    spyOn(userService, 'loadConsignmentTracking').and.callThrough();
    component.orderCode = mockOrder.code;
    component.getConsignmentTracking(mockOrder.consignments[0]);
    fixture.detectChanges();

    expect(userService.loadConsignmentTracking).toHaveBeenCalledWith(
      component.orderCode,
      mockOrder.consignments[0].code
    );
    expect(ngbModal.open).toHaveBeenCalled();
    expect(modalRef.componentInstance.shipDate).toEqual(
      mockOrder.consignments[0].statusDate
    );
    modalRef.componentInstance.tracking$.subscribe(c =>
      expect(c.trackingID).toEqual('1234567890')
    );
  });
});
