import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import {
  Order,
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  I18nTestingModule,
  OrderReturnRequestService,
} from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { ReturnOrderConfirmationComponent } from './return-order-confirmation.component';
import createSpy = jasmine.createSpy;

@Component({
  template: '',
  selector: 'cx-cancel-or-return-items',
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() confirmRequest = false;
  @Input() cancelOrder = true;
  @Output() confirm = new EventEmitter<CancelOrReturnRequestEntryInput[]>();
}

class MockOrderReturnRequestService {
  createOrderReturnRequest = jasmine.createSpy();
  getOrderReturnRequest() {
    return of();
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
  returnOrder = createSpy();
  returnSuccess = createSpy();
  clearCancelOrReturnRequestInputs = createSpy();
  clearReturnRequest = createSpy();
  isEntryCancelledOrReturned(): boolean {
    return true;
  }
  get isReturnSuccess$(): Observable<boolean> {
    return of(true);
  }
}

const mockOrder: Order = {
  code: '1',
  entries: [{ entryNumber: 0 }, { entryNumber: 3 }],
  created: new Date('2019-02-11T13:02:58+0000'),
  returnable: true,
};

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

describe('ReturnOrderConfirmationComponent', () => {
  let component: ReturnOrderConfirmationComponent;
  let fixture: ComponentFixture<ReturnOrderConfirmationComponent>;
  let returnService: MockOrderCancelOrReturnService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
        {
          provide: OrderCancelOrReturnService,
          useClass: MockOrderCancelOrReturnService,
        },
      ],
      declarations: [
        ReturnOrderConfirmationComponent,
        MockCancelOrReturnItemsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderConfirmationComponent);
    component = fixture.componentInstance;

    returnService = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get returned entries', () => {
    let returnedEntries: OrderEntry[];
    component.returnedEntries$
      .subscribe(value => (returnedEntries = value))
      .unsubscribe();

    expect(component.orderCode).toEqual('1');
    expect(returnedEntries).toEqual([{ entryNumber: 0 }, { entryNumber: 3 }]);
  });

  it('should be able to get return success', () => {
    component.ngOnInit();
    expect(returnService.returnSuccess).toHaveBeenCalled();
  });

  it('should be able to submit', () => {
    component.submit();
    expect(returnService.returnOrder).toHaveBeenCalled();
  });

  it('should be able to back to return order page', () => {
    fixture.detectChanges();
    component.back();

    expect(returnService.goToOrderCancelOrReturn).toHaveBeenCalledWith(
      'orderReturn',
      '1'
    );
  });
});
