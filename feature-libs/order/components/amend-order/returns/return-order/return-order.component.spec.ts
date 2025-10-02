import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OrderEntry } from '@spartacus/cart/base/root';
import { FormErrorsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import { ReturnOrderComponent } from './return-order.component';
import { Consignment } from '@spartacus/order/root';

const mockForm = new UntypedFormGroup({
  orderCode: new UntypedFormControl('123'),
  entries: new UntypedFormControl([]),
});

const mockConsignments = [
  {
    entries: [
      {
        orderEntry: { product: { code: 'prod1' } },
        shippedQuantity: 5,
      },
      {
        orderEntry: { product: { code: 'prod2' } },
        shippedQuantity: 3,
      },
    ],
  },
];

const mockEntries = [
  { product: { code: 'prod1' }, returnableQuantity: 0 },
  { product: { code: 'prod2' }, returnableQuantity: 0 },
  { product: { code: 'prod3' }, returnableQuantity: 0 },
];

class MockOrderAmendService {
  getForm() {
    return of(mockForm);
  }
  getEntries() {
    return of(mockEntries);
  }
  getOrder() {
    return of({ consignments: mockConsignments });
  }
}

const expectedReturnableQuantity = 4;
const mockConsignmentsWithPartialMatch: {
  entries: {
    orderEntry: { product: { code: string } };
    shippedQuantity: number;
  }[];
}[] = [
  {
    entries: [
      {
        orderEntry: { product: { code: 'prod1' } },
        shippedQuantity: expectedReturnableQuantity,
      },
    ],
  },
];
class NewMockOrderAmendService extends MockOrderAmendService {
  getOrder() {
    return of({ consignments: mockConsignmentsWithPartialMatch });
  }
}

@Component({
  template: '',
  selector: 'cx-amend-order-items',
  standalone: false,
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
}

@Component({
  template: '',
  selector: 'cx-amend-order-actions',
  standalone: false,
})
class MockAmendOrderActionComponent {
  @Input() orderCode: string;
  @Input() amendOrderForm: UntypedFormGroup;
  @Input() backRoute: string;
  @Input() forwardRoute: string;
}

describe('ReturnOrderComponent', () => {
  let component: ReturnOrderComponent;
  let fixture: ComponentFixture<ReturnOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormErrorsModule],
      providers: [
        { provide: OrderAmendService, useClass: MockOrderAmendService },
      ],
      declarations: [
        ReturnOrderComponent,
        MockAmendOrderActionComponent,
        MockCancelOrReturnItemsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an order code', () => {
    component.form$.subscribe().unsubscribe();
    expect(component.orderCode).toEqual('123');
  });

  it('should render two cx-amend-order-actions components', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('cx-amend-order-actions')).length
    ).toEqual(2);
  });

  it('should render cx-amend-order-items component', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('cx-amend-order-actions')).length
    ).toEqual(2);
  });

  it('should filter and map entries with returnable quantities', () => {
    fixture.detectChanges();

    let result: OrderEntry[] = [];
    component.entries$.subscribe((entries) => (result = entries)).unsubscribe();

    // Verify the filtered and mapped entries
    expect(result.length).toBe(2);
    expect(result[0].product?.code).toBe('prod1');
    expect(result[0].returnableQuantity).toBe(5);
    expect(result[1].product?.code).toBe('prod2');
    expect(result[1].returnableQuantity).toBe(3);
  });

  it('should initialize form$ and set orderCode', () => {
    let formValue: UntypedFormGroup = new UntypedFormGroup({});
    component.form$.subscribe((form) => (formValue = form)).unsubscribe();

    expect(formValue.value.orderCode).toEqual('123');
    expect(component.orderCode).toEqual('123');
  });

  it('should initialize consignments$', () => {
    let consignments: any[] = [];
    component.consignments$
      .subscribe((data) => (consignments = data))
      .unsubscribe();

    expect(consignments.length).toBe(1);
    expect(consignments[0]?.entries.length).toBe(2);
    expect(consignments[0].entries[0].orderEntry.product.code).toBe('prod1');
    expect(consignments[0].entries[0].shippedQuantity).toBe(5);
  });

  it('should initialize entries$ with filtered and mapped entries', () => {
    let entries: OrderEntry[] = [];
    component.entries$.subscribe((data) => (entries = data)).unsubscribe();

    expect(entries.length).toBe(2);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].product?.code).toBe('prod1');
    expect(entries[0].returnableQuantity).toBe(5);
    expect(entries[1].product?.code).toBe('prod2');
    expect(entries[1].returnableQuantity).toBe(3);
  });

  it('should handle empty consignments gracefully', () => {
    spyOn(TestBed.inject(OrderAmendService), 'getOrder').and.returnValue(
      of({ consignments: [] })
    );

    let entries: OrderEntry[] = [];
    component.entries$.subscribe((data) => (entries = data)).unsubscribe();

    expect(entries.length).toBe(2);
  });

  it('should handle entries without matching consignment entries', () => {
    const mockConsignmentsWithoutMatch = [
      {
        entries: [
          {
            orderEntry: { product: { code: 'prodX' } },
            shippedQuantity: 2,
          },
        ],
      },
    ];
    spyOn(TestBed.inject(OrderAmendService), 'getOrder').and.returnValue(
      of({ consignments: mockConsignmentsWithoutMatch })
    );

    let entries: OrderEntry[] = [];
    component.entries$.subscribe((data) => (entries = data)).unsubscribe();

    expect(entries.length).toBe(2);
  });

  it('should set orderCode when form$ is initialized', () => {
    let formValue: UntypedFormGroup = new UntypedFormGroup({});
    component.form$.subscribe((form) => (formValue = form)).unsubscribe();

    expect(formValue.value.orderCode).toEqual('123');
    expect(component.orderCode).toEqual('123');
  });

  it('should initialize consignments$ with correct data', () => {
    let consignments: Consignment[] = [];
    component.consignments$
      .subscribe((data) => (consignments = data))
      .unsubscribe();

    expect(consignments.length).toBe(1);
    expect(consignments[0].entries?.length).toBe(2);
    expect(consignments[0].entries![0].orderEntry).toBeDefined();
    expect(consignments[0].entries![0].orderEntry?.product?.code).toBe('prod1');
    expect(consignments[0].entries![0].shippedQuantity).toBe(5);
  });

  describe('when order has new consignments', () => {
    beforeEach(waitForAsync(() => {
      TestBed.resetTestingModule(); // Reset the existing testing module
      TestBed.configureTestingModule({
        imports: [FormErrorsModule],
        providers: [
          { provide: OrderAmendService, useClass: NewMockOrderAmendService }, // Use the new mock service
        ],
        declarations: [
          ReturnOrderComponent,
          MockAmendOrderActionComponent,
          MockCancelOrReturnItemsComponent,
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should update returnableQuantity based on matching entry consignment', () => {
      let entries: OrderEntry[] = [];
      let consignments: Consignment[] = [];
      component.entries$.subscribe((data) => (entries = data)).unsubscribe();
      component.consignments$
        .subscribe((data) => (consignments = data))
        .unsubscribe();

      expect(consignments.length).toBe(1);
      expect(consignments[0].entries?.length).toBe(1);
      expect(entries.length).toBe(1);
      expect(entries[0].product?.code).toBe('prod1');
      expect(entries[0].returnableQuantity).toBe(expectedReturnableQuantity);
    });
  });
});
