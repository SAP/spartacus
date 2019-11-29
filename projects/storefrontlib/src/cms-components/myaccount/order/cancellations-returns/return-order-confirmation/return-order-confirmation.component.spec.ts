import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {
  Order,
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  RoutingService,
  I18nTestingModule,
  LanguageService,
  OrderReturnRequestService,
} from '@spartacus/core';
import { OrderDetailsService } from '../../order-details/order-details.service';
import { ReturnOrderConfirmationComponent } from './return-order-confirmation.component';

@Component({
  template: '',
  selector: 'cx-cancellation-return-items',
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() confirmRequest = false;
  @Input() cancelOrder = true;
  @Output() confirm = new EventEmitter<CancelOrReturnRequestEntryInput[]>();
}

class MockRoutingService {
  go = jasmine.createSpy('go');
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

class MockOrderReturnRequestService {
  createOrderReturnRequest = jasmine.createSpy();
  getOrderReturnRequest() {
    return of();
  }
}

const mockOrder: Order = {
  code: '1',
  entries: [
    {
      entryNumber: 0,
      returnableQuantity: 1,
      basePrice: { value: 10.0, currencyIso: 'USD' },
    },
    {
      entryNumber: 1,
      returnableQuantity: 0,
      basePrice: { value: 20.0, currencyIso: 'USD' },
    },
    {
      entryNumber: 3,
      returnableQuantity: 5,
      basePrice: { value: 30.0, currencyIso: 'USD' },
    },
  ],
  created: new Date('2019-02-11T13:02:58+0000'),
  returnable: true,
};

class MockOrderDetailsService {
  cancelOrReturnRequestInputs: CancelOrReturnRequestEntryInput[] = [
    { orderEntryNumber: 0, quantity: 1 },
    { orderEntryNumber: 3, quantity: 2 },
  ];

  getOrderDetails() {
    return of(mockOrder);
  }
}

describe('ReturnOrderConfirmationComponent', () => {
  let component: ReturnOrderConfirmationComponent;
  let fixture: ComponentFixture<ReturnOrderConfirmationComponent>;
  let routingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
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

    routingService = TestBed.get(RoutingService as Type<RoutingService>);
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

    expect(returnedEntries[0].entryNumber).toEqual(0);
    expect(returnedEntries[0].returnedQuantity).toEqual(1);
    expect(returnedEntries[0].returnedItemsPrice.value).toEqual(10.0);
    expect(returnedEntries[0].returnedItemsPrice.formattedValue).toEqual(
      '$10.00'
    );

    expect(returnedEntries[1].entryNumber).toEqual(3);
    expect(returnedEntries[1].returnedQuantity).toEqual(2);
    expect(returnedEntries[1].returnedItemsPrice.value).toEqual(60.0);
    expect(returnedEntries[1].returnedItemsPrice.formattedValue).toEqual(
      '$60.00'
    );
  });

  it('should be able to submit', () => {
    component.submit();
    // will be handled in #5477
    // expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'orders' });
  });

  it('should be able to back to return order page', () => {
    fixture.detectChanges();
    component.back();

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderReturn',
      params: { code: '1' },
    });
  });
});
