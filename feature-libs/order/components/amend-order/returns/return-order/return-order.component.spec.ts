import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OrderEntry } from '@spartacus/cart/base/root';
import { FeatureToggles } from '@spartacus/core';
import {
  AmendOrderActionsComponent,
  CancelOrReturnItemsComponent,
} from '@spartacus/order/components';
import { Consignment } from '@spartacus/order/root';
import { FormErrorsModule } from '@spartacus/storefront';
import { combineLatest, firstValueFrom, of } from 'rxjs';
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
  imports: [FormErrorsModule],
})
class MockCancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
}

@Component({
  template: '',
  selector: 'cx-amend-order-actions',
  imports: [FormErrorsModule],
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
  let featureToggles: FeatureToggles;
  let orderAmendService: vi.MockObj<OrderAmendService>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormErrorsModule, ReturnOrderComponent],
      providers: [
        { provide: OrderAmendService, useClass: MockOrderAmendService },
      ],
    })
      .overrideComponent(ReturnOrderComponent, {
        remove: {
          imports: [AmendOrderActionsComponent, CancelOrReturnItemsComponent],
        },
        add: {
          imports: [
            MockAmendOrderActionComponent,
            MockCancelOrReturnItemsComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    featureToggles = {
      enableReturnOrderReturnableQuantityConsigmentFallback: true,
    };
    TestBed.overrideProvider(FeatureToggles, {
      useValue: featureToggles,
    });
    orderAmendService = {
      getForm: vi.fn(),
      getOrder: vi.fn(),
      getEntries: vi.fn(),
    };
    orderAmendService.getForm.mockReturnValue(of(mockForm));
    orderAmendService.getOrder.mockReturnValue(
      of({ consignments: mockConsignments })
    );
    orderAmendService.getEntries.mockReturnValue(of(mockEntries));
    TestBed.overrideProvider(OrderAmendService, {
      useValue: orderAmendService,
    });

    fixture = TestBed.createComponent(ReturnOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an order code', async () => {
    await firstValueFrom(component.form$);
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

  it('should filter and map entries with returnable quantities', async () => {
    fixture.detectChanges();

    const result: OrderEntry[] =
      (await firstValueFrom(component.entries$)) ?? [];
    // Verify the filtered and mapped entries
    expect(result.length).toBe(2);
    expect(result[0].product?.code).toBe('prod1');
    expect(result[0].returnableQuantity).toBe(5);
    expect(result[1].product?.code).toBe('prod2');
    expect(result[1].returnableQuantity).toBe(3);
  });

  it('should initialize form$ and set orderCode', async () => {
    const form: UntypedFormGroup = await firstValueFrom(component.form$);
    expect(form.value.orderCode).toEqual('123');
    expect(component.orderCode).toEqual('123');
  });

  it('should initialize consignments$', async () => {
    const consignments: any[] =
      (await firstValueFrom(component.consignments$)) ?? [];
    expect(consignments.length).toBe(1);
    expect(consignments[0]?.entries.length).toBe(2);
    expect(consignments[0].entries[0].orderEntry.product.code).toBe('prod1');
    expect(consignments[0].entries[0].shippedQuantity).toBe(5);
  });

  it('should initialize entries$ with filtered and mapped entries', async () => {
    const entries: OrderEntry[] =
      (await firstValueFrom(component.entries$)) ?? [];
    expect(entries.length).toBe(2);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].product?.code).toBe('prod1');
    expect(entries[0].returnableQuantity).toBe(5);
    expect(entries[1].product?.code).toBe('prod2');
    expect(entries[1].returnableQuantity).toBe(3);
  });

  it('should handle empty consignments gracefully', async () => {
    orderAmendService.getOrder.mockReturnValue(of({ consignments: [] }));

    const entries: OrderEntry[] =
      (await firstValueFrom(component.entries$)) ?? [];
    expect(entries.length).toBe(2);
  });

  it('should handle entries without matching consignment entries', async () => {
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
    orderAmendService.getOrder.mockReturnValue(
      of({ consignments: mockConsignmentsWithoutMatch })
    );

    const entries: OrderEntry[] =
      (await firstValueFrom(component.entries$)) ?? [];
    expect(entries.length).toBe(2);
  });

  it('should set orderCode when form$ is initialized', async () => {
    const formValue: UntypedFormGroup = await firstValueFrom(component.form$);
    expect(formValue.value.orderCode).toEqual('123');
    expect(component.orderCode).toEqual('123');
  });

  it('should initialize consignments$ with correct data', async () => {
    const consignments: Consignment[] =
      (await firstValueFrom(component.consignments$)) ?? [];
    expect(consignments.length).toBe(1);
    expect(consignments[0].entries?.length).toBe(2);
    expect(consignments[0]?.entries?.[0].orderEntry).toBeDefined();
    expect(consignments[0]?.entries?.[0].orderEntry?.product?.code).toBe(
      'prod1'
    );
    expect(consignments[0]?.entries?.[0].shippedQuantity).toBe(5);
  });

  describe('when order has new consignments', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [FormErrorsModule, ReturnOrderComponent],
        providers: [
          { provide: OrderAmendService, useClass: NewMockOrderAmendService },
          {
            provide: FeatureToggles,
            useValue: {
              enableReturnOrderReturnableQuantityConsigmentFallback: true,
            } satisfies FeatureToggles,
          },
        ],
      })
        .overrideComponent(ReturnOrderComponent, {
          remove: {
            imports: [
              /* original child components will be removed in runtime */
            ],
          },
          add: {
            imports: [
              MockAmendOrderActionComponent,
              MockCancelOrReturnItemsComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should update returnableQuantity based on matching entry consignment', async () => {
      const [entries, consignments] = (await firstValueFrom(
        combineLatest([component.entries$, component.consignments$])
      )) as [OrderEntry[], Consignment[]];
      expect(consignments.length).toBe(1);
      expect(consignments[0].entries?.length).toBe(1);
      expect(entries.length).toBe(1);
      expect(entries[0].product?.code).toBe('prod1');
      expect(entries[0].returnableQuantity).toBe(expectedReturnableQuantity);
    });
  });

  describe('when feature is disabled', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [FormErrorsModule, ReturnOrderComponent],
        providers: [
          {
            provide: OrderAmendService,
            useValue: {
              getForm() {
                return of(mockForm);
              },
              getEntries() {
                return of(mockEntries);
              },
              getOrder() {
                return of({ consignments: [] });
              },
            },
          },
          {
            provide: FeatureToggles,
            useValue: {
              enableReturnOrderReturnableQuantityConsigmentFallback: false,
            } satisfies FeatureToggles,
          },
        ],
      })
        .overrideComponent(ReturnOrderComponent, {
          remove: {
            imports: [
              /* original child components will be removed in runtime */
            ],
          },
          add: {
            imports: [
              MockAmendOrderActionComponent,
              MockCancelOrReturnItemsComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should not return entired when no matching entry consignment was found', async () => {
      const [entries, consignments] = (await firstValueFrom(
        combineLatest([component.entries$, component.consignments$])
      )) as [OrderEntry[], Consignment[]];
      expect(consignments.length).toBe(0);
      expect(entries.length).toBe(0);
    });
  });

  describe('when feature toggle is disabled and no consignment shippedQuantity is provided', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [FormErrorsModule, ReturnOrderComponent],
      })
        .overrideComponent(ReturnOrderComponent, {
          remove: {
            imports: [
              /* original child components will be removed in runtime */
            ],
          },
          add: {
            imports: [
              MockAmendOrderActionComponent,
              MockCancelOrReturnItemsComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      featureToggles.enableReturnOrderReturnableQuantityConsigmentFallback =
        false;
      TestBed.overrideProvider(FeatureToggles, {
        useValue: featureToggles,
      });
      orderAmendService.getForm.mockReturnValue(of(mockForm));
      const expectedEntries = mockEntries.map((entry) => ({
        ...entry,
        returnableQuantity: 2,
      }));
      orderAmendService.getEntries.mockReturnValue(of(expectedEntries));
      const expectedConfigments = mockConsignments.map((consignment) => ({
        entries: consignment.entries.map((entry) => ({
          orderEntry: entry.orderEntry,
          shippedQuantity: 0,
        })),
      }));
      orderAmendService.getOrder.mockReturnValue(
        of({ consignments: expectedConfigments })
      );
      TestBed.overrideProvider(OrderAmendService, {
        useValue: orderAmendService,
      });

      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should set returnableQuantity to 0 when feature toggle is disabled', async () => {
      const result = await firstValueFrom(component.entries$);
      // No entries should be returned since shippedQuantity is 0 & feature toggle is off
      expect(result.length).toBe(0);
    });
  });
});
