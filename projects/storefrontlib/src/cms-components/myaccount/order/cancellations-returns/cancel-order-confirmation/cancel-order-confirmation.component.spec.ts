import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import {
  Order,
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  I18nTestingModule,
} from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
import { CancelOrderConfirmationComponent } from './cancel-order-confirmation.component';
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
  cancelOrder = createSpy();
  cancelSuccess = createSpy();
  isEntryCancelledOrReturned(): boolean {
    return true;
  }
  get isCancelSuccess$(): Observable<boolean> {
    return of(true);
  }
}

const mockOrder: Order = {
  code: '1',
  entries: [{ entryNumber: 0 }, { entryNumber: 3 }],
  created: new Date('2019-02-11T13:02:58+0000'),
  cancellable: true,
};

class MockOrderDetailsService {
  getOrderDetails() {
    return of(mockOrder);
  }
}

describe('CancelOrderConfirmationComponent', () => {
  let component: CancelOrderConfirmationComponent;
  let fixture: ComponentFixture<CancelOrderConfirmationComponent>;
  let cancelService: MockOrderCancelOrReturnService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        {
          provide: OrderCancelOrReturnService,
          useClass: MockOrderCancelOrReturnService,
        },
      ],
      declarations: [
        CancelOrderConfirmationComponent,
        MockCancelOrReturnItemsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderConfirmationComponent);
    component = fixture.componentInstance;

    cancelService = TestBed.get(OrderCancelOrReturnService as Type<
      OrderCancelOrReturnService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cancelled entries', () => {
    let cancelledEntries: OrderEntry[];
    component.cancelledEntries$
      .subscribe(value => (cancelledEntries = value))
      .unsubscribe();

    expect(component.orderCode).toEqual('1');
    expect(cancelledEntries).toEqual([{ entryNumber: 0 }, { entryNumber: 3 }]);
  });

  it('should be able to get cancel success', () => {
    component.cancelledEntries$.subscribe().unsubscribe();
    component.ngOnInit();
    expect(cancelService.cancelSuccess).toHaveBeenCalledWith('1');
  });

  it('should be able to submit', () => {
    component.submit();
    expect(cancelService.cancelOrder).toHaveBeenCalled();
  });

  it('should be able to back to cancel order page', () => {
    fixture.detectChanges();
    component.back();

    expect(cancelService.goToOrderCancelOrReturn).toHaveBeenCalledWith(
      'orderCancel',
      '1'
    );
  });
});
