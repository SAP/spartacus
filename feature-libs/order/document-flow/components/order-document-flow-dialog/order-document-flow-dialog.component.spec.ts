import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
  MessageComponentModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { OrderDocumentFlowFacade } from '../../root/facade';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '../../root/model';
import { OrderDocumentFlowDialogComponent } from './order-document-flow-dialog.component';
import { OrderSubsequentDocumentNodeComponent } from './order-document-flow-list';
import { OrderDocumentOrderEntryListComponent } from './order-document-order-entry-list';

const orderCode = '00001004';

const subsequentDocumentsData: OrderSubsequentDocument[] = [
  {
    sapDocumentId: 'doc_id1',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [
      {
        sapDocumentId: 'doc_id11',
        sapDocumentCategory: 'category1',
        sapDocumentEntryIdColumnName: 'Outbound delivery',
        sapSubsequentDocuments: [
          {
            sapDocumentId: 'doc_id111',
            sapDocumentCategory: 'category1',
            sapDocumentEntryIdColumnName: 'Picking Request',
            sapSubsequentDocuments: [],
            sapCreatedAt: new Date(),
            sapStatus: 'open',
          },
        ],
        sapCreatedAt: new Date(),
        sapStatus: 'open',
      },
    ],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
  {
    sapDocumentId: 'doc_id2',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
  {
    sapDocumentId: 'doc_id3',
    sapDocumentCategory: 'category2',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
];

const subsequentDocumentEntryData: OrderSubsequentDocumentEntry[] = [
  {
    sapSubsequentDocumentEntryNumber: '1',
    sapOrderEntryNumber: '1',
    sapCreatedAt: new Date(),
    sapStatus: 'completed',
  },
  {
    sapSubsequentDocumentEntryNumber: '2',
    sapOrderEntryNumber: '1',
    sapCreatedAt: new Date(),
    sapStatus: 'completed',
  },
];

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> | undefined {
    return of({ orderCode });
  }

  closeDialog() {}
}

describe('OrderDocumentFlowDialogComponent', () => {
  let component: OrderDocumentFlowDialogComponent;
  let fixture: ComponentFixture<OrderDocumentFlowDialogComponent>;
  let orderDocumentFlowFacade: vi.MockObj<OrderDocumentFlowFacade>;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    const orderDocumentFlowFacadeSpy = {
      getOrderSubsequentDocuments: vi.fn(),
      getOrderSubsequentDocumentEntries: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconModule,
        SpinnerModule,
        KeyboardFocusModule,
        MessageComponentModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        {
          provide: OrderDocumentFlowFacade,
          useValue: orderDocumentFlowFacadeSpy,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: vi.fn('markForCheck') },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(OrderDocumentFlowDialogComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe],
        },
      })
      .overrideComponent(OrderDocumentOrderEntryListComponent, {
        remove: {
          imports: [CxDatePipe],
        },
        add: {
          imports: [MockDatePipe],
        },
      })
      .overrideComponent(OrderSubsequentDocumentNodeComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    orderDocumentFlowFacade = TestBed.inject(
      OrderDocumentFlowFacade
    ) as anyObj<OrderDocumentFlowFacade>;
    launchDialogService = TestBed.inject(LaunchDialogService);
    orderDocumentFlowFacade.getOrderSubsequentDocuments.mockReturnValue(
      of(subsequentDocumentsData)
    );
    orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
      of(subsequentDocumentEntryData)
    );
    fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialogue when modal is dismissed', () => {
    vi.spyOn(launchDialogService, 'closeDialog');
    const closeReason = 'mock close';
    component.close(closeReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(closeReason);
  });

  describe('subsequent documents observable', () => {
    it('should return subsequent document array', async () => {
      orderDocumentFlowFacade.getOrderSubsequentDocuments.mockReturnValue(
        of(subsequentDocumentsData)
      );
      (component as any).orderCode$ = of(orderCode);

      expect(component.documents$).toBeDefined();
      const documents = await firstValueFrom(component.documents$);
      expect(documents).toEqual(subsequentDocumentsData);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocuments
      ).toHaveBeenCalled();
    });

    it('should return empty array on error', async () => {
      orderDocumentFlowFacade.getOrderSubsequentDocuments.mockReturnValue(
        throwError(() => 'mockError')
      );
      (component as any).orderCode$ = of(orderCode);

      const documents = await firstValueFrom(component.documents$);
      expect(documents).toEqual([]);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocuments
      ).toHaveBeenCalled();
    });

    it('should update loadError signal on error', async () => {
      orderDocumentFlowFacade.getOrderSubsequentDocuments.mockReturnValue(
        throwError(() => 'mockError')
      );
      expect(component.loadError()).toBe(false);

      (component as any).orderCode$ = of(orderCode);
      await firstValueFrom(component.documents$);

      expect(component.loadError()).toBe(true);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocuments
      ).toHaveBeenCalled();
    });
  });

  describe('subsequent document entries observable', () => {
    it('should return subsequent document entry array', async () => {
      orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
        of(subsequentDocumentEntryData)
      );
      (component as any).orderCode$ = of(orderCode);
      fixture.detectChanges();
      component.onDocumentSelection(subsequentDocumentsData[0]);

      expect(component.selectedDocumentEntries$).toBeDefined();
      const entries = await firstValueFrom(component.selectedDocumentEntries$);
      expect(entries).toEqual(subsequentDocumentEntryData);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
      ).toHaveBeenCalled();
    });

    it('should return empty array on error', async () => {
      orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
        throwError(() => 'mockError')
      );
      (component as any).orderCode$ = of(orderCode);
      fixture.detectChanges();
      component.onDocumentSelection(subsequentDocumentsData[0]);

      const entries = await firstValueFrom(component.selectedDocumentEntries$);
      expect(entries).toEqual([]);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
      ).toHaveBeenCalled();
    });

    it('should update loadError signal on error', async () => {
      orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
        throwError(() => 'mockError')
      );
      expect(component.loadError()).toBe(false);

      (component as any).orderCode$ = of(orderCode);
      fixture.detectChanges();
      component.onDocumentSelection(subsequentDocumentsData[0]);

      await firstValueFrom(component.selectedDocumentEntries$);

      expect(component.loadError()).toBe(true);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
      ).toHaveBeenCalled();
    });

    describe('cache', () => {
      it('should cache successful fetch', async () => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
          of(subsequentDocumentEntryData)
        );
        (component as any).orderCode$ = of(orderCode);
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);

        expect(component.selectedDocumentEntries$).toBeDefined();
        const entries1 = await firstValueFrom(
          component.selectedDocumentEntries$
        );
        expect(entries1).toEqual(subsequentDocumentEntryData);

        const entries2 = await firstValueFrom(
          component.selectedDocumentEntries$
        );
        expect(entries2).toEqual(subsequentDocumentEntryData);

        expect(
          orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
        ).toHaveBeenCalledTimes(1);
      });
      it('should not cache empty fetch', async () => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
          of([])
        );
        (component as any).orderCode$ = of(orderCode);
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);

        await firstValueFrom(component.selectedDocumentEntries$);
        await firstValueFrom(component.selectedDocumentEntries$);

        expect(
          orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
        ).toHaveBeenCalledTimes(2);
      });
      it('should not cache on fetch error', async () => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
          throwError(() => 'mockError')
        );
        (component as any).orderCode$ = of(orderCode);
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);

        await firstValueFrom(component.selectedDocumentEntries$);
        await firstValueFrom(component.selectedDocumentEntries$);

        expect(
          orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
        ).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Template', () => {
    describe('When document is selected', () => {
      it('should display go back button', () => {
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);
        fixture.detectChanges();

        let goBackButtonEls = fixture.debugElement.queryAll(
          By.css('button.back')
        );
        expect(goBackButtonEls.length).toBe(1);
      });
      it('should display info message strip on empty fetch', () => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
          of([])
        );
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);
        fixture.detectChanges();

        let infoMessageEls = fixture.debugElement.queryAll(
          By.css('.info-message')
        );
        let documentEntryListEls = fixture.debugElement.queryAll(
          By.css('cx-order-document-order-entry-list')
        );
        expect(infoMessageEls.length).toBe(1);
        expect(documentEntryListEls.length).toBe(0);
      });
      it('should display error message strip on error fetch', () => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.mockReturnValue(
          throwError(() => 'mockError')
        );
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);
        fixture.detectChanges();

        let infoMessageEls = fixture.debugElement.queryAll(
          By.css('.error-message')
        );
        let documentEntryListEls = fixture.debugElement.queryAll(
          By.css('cx-order-document-order-entry-list')
        );

        expect(infoMessageEls.length).toBe(1);
        expect(documentEntryListEls.length).toBe(0);
      });
      it('should not display document list', () => {
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);
        fixture.detectChanges();

        let documentListEls = fixture.debugElement.queryAll(
          By.css('cx-order-subsequent-document-list')
        );
        expect(documentListEls.length).toBe(0);
      });
      it('should display document entry list', () => {
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);
        fixture.detectChanges();

        let documentEntryListEls = fixture.debugElement.queryAll(
          By.css('cx-order-document-order-entry-list')
        );
        expect(documentEntryListEls.length).toBe(1);
      });
    });
    describe('When document is NOT selected', () => {
      it('should not display go back button', () => {
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        let goBackButtonEls = fixture.debugElement.queryAll(
          By.css('button.back')
        );
        expect(goBackButtonEls.length).toBe(0);
      });
      it('should display info message strip on empty fetch', () => {
        orderDocumentFlowFacade.getOrderSubsequentDocuments.mockReturnValue(
          of([])
        );
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        let infoMessageEls = fixture.debugElement.queryAll(
          By.css('.info-message')
        );
        let documentListEls = fixture.debugElement.queryAll(
          By.css('cx-order-subsequent-document-list')
        );
        expect(infoMessageEls.length).toBe(1);
        expect(documentListEls.length).toBe(0);
      });
      it('should display error message strip on error fetch', () => {
        orderDocumentFlowFacade.getOrderSubsequentDocuments.mockReturnValue(
          throwError(() => 'mockError')
        );
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        let infoMessageEls = fixture.debugElement.queryAll(
          By.css('.error-message')
        );
        let documentListEls = fixture.debugElement.queryAll(
          By.css('cx-order-subsequent-document-list')
        );

        expect(infoMessageEls.length).toBe(1);
        expect(documentListEls.length).toBe(0);
      });
      it('should display document list', () => {
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        let documentListEls = fixture.debugElement.queryAll(
          By.css('cx-order-subsequent-document-list')
        );
        expect(documentListEls.length).toBe(1);
      });
      it('should not display document entry list', () => {
        fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        let documentEntryListEls = fixture.debugElement.queryAll(
          By.css('cx-order-document-order-entry-list')
        );
        expect(documentEntryListEls.length).toBe(0);
      });
    });
  });
});
