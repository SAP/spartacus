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
import { CancelOrderComponent } from './cancel-order.component';
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
    { entryNumber: 0, cancellableQuantity: 1 },
    { entryNumber: 1, cancellableQuantity: 0 },
    { entryNumber: 3, cancellableQuantity: 5 },
  ],
  created: new Date('2019-02-11T13:02:58+0000'),
  cancellable: true,
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

describe('CancelOrderComponent', () => {
  let component: CancelOrderComponent;
  let fixture: ComponentFixture<CancelOrderComponent>;
  let cancelService: MockOrderCancelOrReturnService;

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
      declarations: [CancelOrderComponent, MockCancelOrReturnItemsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderComponent);
    component = fixture.componentInstance;

    cancelService = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cancellable entries', () => {
    fixture.detectChanges();
    let cancellableEntries: OrderEntry[];
    component.cancellableEntries$
      .subscribe(value => {
        cancellableEntries = value;
      })
      .unsubscribe();
    expect(component.orderCode).toEqual('1');
    expect(cancellableEntries).toEqual([
      { entryNumber: 0, cancellableQuantity: 1 },
      { entryNumber: 3, cancellableQuantity: 5 },
    ]);
  });

  it('should clear cancel request input when initialize', () => {
    component.ngOnInit();
    expect(cancelService.clearCancelOrReturnRequestInputs).toHaveBeenCalled();
  });

  it('should go to cancel confirmation page', () => {
    const entryInputs = [
      { orderEntryNumber: 0, quantity: 1 },
      { orderEntryNumber: 3, quantity: 5 },
    ];

    fixture.detectChanges();
    component.confirmCancel(entryInputs);

    expect(cancelService.cancelOrReturnRequestInputs).toEqual(entryInputs);
    expect(cancelService.goToOrderCancelOrReturn).toHaveBeenCalledWith(
      'orderCancelConfirmation',
      '1'
    );
  });
});
