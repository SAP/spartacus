import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import {
  FeatureConfigService,
  FeaturesConfigModule,
  FeatureToggles,
  I18nTestingModule,
} from '@spartacus/core';
import {
  AmendOrderActionsComponent,
  CancelOrReturnItemsComponent,
} from '@spartacus/order/components';
import { Consignment } from '@spartacus/order/root';
import {
  FormErrorsModule,
  HierarchyComponentService,
  HierarchyNode,
  OutletModule,
} from '@spartacus/storefront';
import { combineLatest, Observable, of, take } from 'rxjs';
import { OrderAmendService } from '../../amend-order.service';
import { OrderReturnService } from '../order-return.service';
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
  override getOrder() {
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
  @Input() isBundleConfig: boolean;
  @Input() hasHeader: boolean;
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

class MockOrderReturnService {
  getEntries(): Observable<OrderEntry[]> {
    return of([{}] as OrderEntry[]);
  }
  getOrderEntryGroups(): Observable<OrderEntryGroup[]> {
    return of([{}] as OrderEntryGroup[]);
  }
}

class MockHierarchyService {
  getEntriesFromGroups(): Observable<OrderEntry[]> {
    return of([{}] as OrderEntry[]);
  }
  getBundlesFromGroups(): Observable<HierarchyNode[]> {
    return of([]);
  }
}

describe('ReturnOrderComponent', () => {
  let component: ReturnOrderComponent;
  let fixture: ComponentFixture<ReturnOrderComponent>;
  let featureToggles: FeatureToggles;
  let orderAmendService: jasmine.SpyObj<OrderAmendService>;

  const mockFeatureConfigSpy = jasmine.createSpyObj('FeatureConfigService', [
    'isEnabled',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        I18nTestingModule,
        RouterModule.forRoot([]),
        FormErrorsModule,
        OutletModule,
        FeaturesConfigModule,
      ],
      providers: [
        { provide: OrderAmendService, useClass: MockOrderAmendService },
        {
          provide: HierarchyComponentService,
          useClass: MockHierarchyService,
        },
        { provide: OrderReturnService, useClass: MockOrderReturnService },
        { provide: FeatureConfigService, useValue: mockFeatureConfigSpy },
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
  }));

  beforeEach(() => {
    featureToggles = {
      enableReturnOrderReturnableQuantityConsigmentFallback: true,
    };
    TestBed.overrideProvider(FeatureToggles, {
      useValue: featureToggles,
    });
    orderAmendService = jasmine.createSpyObj('OrderAmendService', [
      'getForm',
      'getOrder',
      'getEntries',
    ]);
    orderAmendService.getForm.and.returnValue(of(mockForm));
    orderAmendService.getOrder.and.returnValue(
      of({ consignments: mockConsignments })
    );
    orderAmendService.getEntries.and.returnValue(of(mockEntries));
    TestBed.overrideProvider(OrderAmendService, {
      useValue: orderAmendService,
    });

    fixture = TestBed.createComponent(ReturnOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an order code', (done) => {
    component.form$.pipe(take(1)).subscribe(() => {
      expect(component.orderCode).toEqual('123');
      done();
    });
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

  it('should filter and map entries with returnable quantities', (done) => {
    fixture.detectChanges();

    component.entries$.pipe(take(1)).subscribe((result: OrderEntry[] = []) => {
      expect(result.length).toBe(2);
      expect(result[0].product?.code).toBe('prod1');
      expect(result[0].returnableQuantity).toBe(5);
      expect(result[1].product?.code).toBe('prod2');
      expect(result[1].returnableQuantity).toBe(3);
      done();
    });
  });

  it('should initialize form$ and set orderCode', (done) => {
    component.form$.pipe(take(1)).subscribe((form: UntypedFormGroup) => {
      expect(form.value.orderCode).toEqual('123');
      expect(component.orderCode).toEqual('123');
      done();
    });
  });

  it('should initialize consignments$', (done) => {
    component.consignments$
      .pipe(take(1))
      .subscribe((consignments: any[] = []) => {
        expect(consignments.length).toBe(1);
        expect(consignments[0]?.entries.length).toBe(2);
        expect(consignments[0].entries[0].orderEntry.product.code).toBe(
          'prod1'
        );
        expect(consignments[0].entries[0].shippedQuantity).toBe(5);
        done();
      });
  });

  it('should initialize entries$ with filtered and mapped entries', (done) => {
    component.entries$.pipe(take(1)).subscribe((entries: OrderEntry[] = []) => {
      expect(entries.length).toBe(2);
      expect(entries.length).toBeGreaterThan(0);
      expect(entries[0].product?.code).toBe('prod1');
      expect(entries[0].returnableQuantity).toBe(5);
      expect(entries[1].product?.code).toBe('prod2');
      expect(entries[1].returnableQuantity).toBe(3);
      done();
    });
  });

  it('should handle empty consignments gracefully', (done) => {
    orderAmendService.getOrder.and.returnValue(of({ consignments: [] }));

    component.entries$.pipe(take(1)).subscribe((entries: OrderEntry[] = []) => {
      expect(entries.length).toBe(2);
      done();
    });
  });

  it('should handle entries without matching consignment entries', (done) => {
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
    orderAmendService.getOrder.and.returnValue(
      of({ consignments: mockConsignmentsWithoutMatch })
    );

    component.entries$.pipe(take(1)).subscribe((entries: OrderEntry[] = []) => {
      expect(entries.length).toBe(2);
      done();
    });
  });

  it('should set orderCode when form$ is initialized', (done) => {
    component.form$.pipe(take(1)).subscribe((formValue: UntypedFormGroup) => {
      expect(formValue.value.orderCode).toEqual('123');
      expect(component.orderCode).toEqual('123');
      done();
    });
  });

  it('should initialize consignments$ with correct data', (done) => {
    component.consignments$
      .pipe(take(1))
      .subscribe((consignments: Consignment[] = []) => {
        expect(consignments.length).toBe(1);
        expect(consignments[0].entries?.length).toBe(2);
        expect(consignments[0]?.entries?.[0].orderEntry).toBeDefined();
        expect(consignments[0]?.entries?.[0].orderEntry?.product?.code).toBe(
          'prod1'
        );
        expect(consignments[0]?.entries?.[0].shippedQuantity).toBe(5);
        done();
      });
  });

  describe('when order has new consignments', () => {
    beforeEach(waitForAsync(() => {
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
          {
            provide: HierarchyComponentService,
            useClass: MockHierarchyService,
          },
          { provide: OrderReturnService, useClass: MockOrderReturnService },
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
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should update returnableQuantity based on matching entry consignment', (done) => {
      combineLatest([
        component.entries$.pipe(take(1)),
        component.consignments$.pipe(take(1)),
      ]).subscribe(([entries, consignments]: [OrderEntry[], Consignment[]]) => {
        expect(consignments.length).toBe(1);
        expect(consignments[0].entries?.length).toBe(1);
        expect(entries.length).toBe(1);
        expect(entries[0].product?.code).toBe('prod1');
        expect(entries[0].returnableQuantity).toBe(expectedReturnableQuantity);
        done();
      });
    });
  });

  describe('when feature is disabled', () => {
    beforeEach(waitForAsync(() => {
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
          {
            provide: HierarchyComponentService,
            useClass: MockHierarchyService,
          },
          { provide: OrderReturnService, useClass: MockOrderReturnService },
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
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should not return entries when no matching entry consignment was found', (done) => {
      combineLatest([
        component.entries$.pipe(take(1)),
        component.consignments$.pipe(take(1)),
      ]).subscribe(([entries, consignments]: [OrderEntry[], Consignment[]]) => {
        expect(consignments.length).toBe(0);
        expect(entries.length).toBe(0);
        done();
      });
    });
  });

  describe('when enableBundles feature is enabled', () => {
    beforeEach(waitForAsync(() => {
      TestBed.resetTestingModule();
      const bundleFeatureConfigSpy = jasmine.createSpyObj(
        'FeatureConfigService',
        ['isEnabled']
      );
      bundleFeatureConfigSpy.isEnabled.and.returnValue(true);
      TestBed.configureTestingModule({
        imports: [FormErrorsModule, ReturnOrderComponent],
        providers: [
          { provide: OrderAmendService, useClass: MockOrderAmendService },
          {
            provide: FeatureConfigService,
            useValue: bundleFeatureConfigSpy,
          },
          {
            provide: HierarchyComponentService,
            useClass: MockHierarchyService,
          },
          { provide: OrderReturnService, useClass: MockOrderReturnService },
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
    }));

    beforeEach(() => {
      featureToggles.enableReturnOrderReturnableQuantityConsigmentFallback =
        false;
      TestBed.overrideProvider(FeatureToggles, {
        useValue: featureToggles,
      });
      orderAmendService.getForm.and.returnValue(of(mockForm));
      const expectedEntries = mockEntries.map((entry) => ({
        ...entry,
        returnableQuantity: 2,
      }));
      orderAmendService.getEntries.and.returnValue(of(expectedEntries));
      const expectedConfigments = mockConsignments.map((consignment) => ({
        entries: consignment.entries.map((entry) => ({
          orderEntry: entry.orderEntry,
          shippedQuantity: 0,
        })),
      }));
      orderAmendService.getOrder.and.returnValue(
        of({ consignments: expectedConfigments })
      );
      TestBed.overrideProvider(OrderAmendService, {
        useValue: orderAmendService,
      });

      fixture = TestBed.createComponent(ReturnOrderComponent);
      component = fixture.componentInstance;
    });

    it('should set entries$ and bundles$ if enableBundles feature is enabled', () => {
      fixture.detectChanges();
      expect(component.entryGroups$).toBeDefined();
      expect(component.entries$).toBeDefined();
      expect(component.bundles$).toBeDefined();
    });
  });
});
