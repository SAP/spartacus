import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  Order,
  OrderEntry,
  CancelOrReturnRequestEntryInput,
} from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { ReturnOrderComponent } from './return-order.component';
import createSpy = jasmine.createSpy;

@Component({
  template: '',
  selector: 'cx-cancel-or-return-items',
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() cancelOrder = true;
  @Input() orderCode: string;
  @Output() confirm = new EventEmitter<CancelOrReturnRequestEntryInput[]>();
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
  getOrderDetails() {
    return of(mockOrder);
  }
}

class MockOrderCancelOrReturnService {
  _cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[];
  get cancelOrReturnRequestInputs(): CancelOrReturnRequestEntryInput[] {
    return this._cancelOrReturnRequestInputs;
  }

  set cancelOrReturnRequestInputs(values: CancelOrReturnRequestEntryInput[]) {
    this._cancelOrReturnRequestInputs = values;
  }

  goToOrderCancelOrReturn = createSpy();
  clearCancelOrReturnRequestInputs = createSpy();
}

describe('ReturnOrderComponent', () => {
  let component: ReturnOrderComponent;
  let fixture: ComponentFixture<ReturnOrderComponent>;
  let returnService: MockOrderCancelOrReturnService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        {
          provide: OrderCancelOrReturnService,
          useClass: MockOrderCancelOrReturnService,
        },
      ],
      declarations: [ReturnOrderComponent, MockCancelOrReturnItemsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderComponent);
    component = fixture.componentInstance;

    returnService = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get returnable entries', () => {
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

  it('should clear return request input when initialize', () => {
    component.ngOnInit();
    expect(returnService.clearCancelOrReturnRequestInputs).toHaveBeenCalled();
  });

  it('should go to return confirmation page', () => {
    const entryInputs = [
      { orderEntryNumber: 0, quantity: 1 },
      { orderEntryNumber: 3, quantity: 5 },
    ];

    fixture.detectChanges();
    component.confirmReturn(entryInputs);

    expect(returnService.cancelOrReturnRequestInputs).toEqual(entryInputs);
    expect(returnService.goToOrderCancelOrReturn).toHaveBeenCalledWith(
      'orderReturnConfirmation',
      '1'
    );
  });
});
