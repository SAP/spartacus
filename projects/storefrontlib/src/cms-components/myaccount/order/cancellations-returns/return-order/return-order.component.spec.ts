import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  Order,
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  RoutingService,
} from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { ReturnOrderComponent } from './return-order.component';

@Component({
  template: '',
  selector: 'cx-cancel-or-return-items',
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() cancelOrder = true;
  @Output() confirm = new EventEmitter<CancelOrReturnRequestEntryInput[]>();
}

class MockRoutingService {
  go = jasmine.createSpy('go');
}

const mockOrder: Order = {
  code: '1',
  entries: [
    { entryNumber: 0, returnableQuantity: 1 },
    { entryNumber: 1, returnableQuantity: 0 },
    { entryNumber: 3, returnableQuantity: 5 },
  ],
  created: new Date('2019-02-11T13:02:58+0000'),
  returnable: true,
};

class MockOrderDetailsService {
  _cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[];

  getOrderDetails() {
    return of(mockOrder);
  }

  get cancelOrReturnRequestInputs(): CancelOrReturnRequestEntryInput[] {
    return this._cancelOrReturnRequestInputs;
  }

  set cancelOrReturnRequestInputs(values: CancelOrReturnRequestEntryInput[]) {
    this._cancelOrReturnRequestInputs = values;
  }
}

describe('ReturnOrderComponent', () => {
  let component: ReturnOrderComponent;
  let fixture: ComponentFixture<ReturnOrderComponent>;
  let orderService: MockOrderDetailsService;
  let routingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
      declarations: [ReturnOrderComponent, MockCancelOrReturnItemsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderComponent);
    component = fixture.componentInstance;

    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    orderService = TestBed.get(OrderDetailsService as Type<
      OrderDetailsService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    fixture.detectChanges();
    let returnableEntries: OrderEntry[];
    component.returnableEntries$
      .subscribe(value => {
        returnableEntries = value;
      })
      .unsubscribe();
    expect(component.orderCode).toEqual('1');
    expect(returnableEntries).toEqual([
      { entryNumber: 0, returnableQuantity: 1 },
      { entryNumber: 3, returnableQuantity: 5 },
    ]);
  });

  it('should go to order confirmation page', () => {
    const entryInputs = [
      { orderEntryNumber: 0, quantity: 1 },
      { orderEntryNumber: 3, quantity: 5 },
    ];

    fixture.detectChanges();
    component.confirmReturn(entryInputs);

    expect(orderService.cancelOrReturnRequestInputs).toEqual(entryInputs);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderReturnConfirmation',
      params: { code: '1' },
    });
  });
});
