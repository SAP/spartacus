import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OrderEntry } from '@spartacus/cart/base/root';
import { FormErrorsModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import { ReturnOrderComponent } from './return-order.component';

const mockForm = new UntypedFormGroup({
  orderCode: new UntypedFormControl('123'),
  entries: new UntypedFormControl([]),
});

const mockConsignments = [
  {
    entries: [
      {
        orderEntry: { product: { code: 'prod1' }},
        shippedQuantity: 5
      },
      {
        orderEntry: { product: { code: 'prod2' }},
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

  it('should render one cx-amend-order-actions components', () => {
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
    fixture.detectChanges(); // Ensure the component initializes properly

    let result: OrderEntry[];
    component.entries$.subscribe((entries) => (result = entries)).unsubscribe();

    // Verify the filtered and mapped entries
    expect(result.length).toBe(2); // Expect two entries with returnable quantities
    expect(result[0].product.code).toBe('prod1');
    expect(result[0].returnableQuantity).toBe(5);
    expect(result[1].product.code).toBe('prod2');
    expect(result[1].returnableQuantity).toBe(3);
  });
});
