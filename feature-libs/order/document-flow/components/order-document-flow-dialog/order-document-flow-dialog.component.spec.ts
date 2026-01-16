import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { Observable, of, throwError } from 'rxjs';
import { OrderDocumentFlowFacade } from '../../root/facade';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '../../root/model';
import { OrderDocumentFlowDialogComponent } from './order-document-flow-dialog.component';
import { OrderSubsequentDocumentNodeComponent } from './order-document-flow-list';
import { OrderDocumentOrderEntryListComponent } from './order-document-order-entry-list';

import createSpy = jasmine.createSpy;

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
  let orderDocumentFlowFacade: jasmine.SpyObj<OrderDocumentFlowFacade>;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    const orderDocumentFlowFacadeSpy = jasmine.createSpyObj(
      'OrderDocumentFlowFacade',
      ['getOrderSubsequentDocuments', 'getOrderSubsequentDocumentEntries']
    );

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
          useValue: { markForCheck: createSpy('markForCheck') },
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
  }));

  beforeEach(() => {
    orderDocumentFlowFacade = TestBed.inject(
      OrderDocumentFlowFacade
    ) as jasmine.SpyObj<OrderDocumentFlowFacade>;
    launchDialogService = TestBed.inject(LaunchDialogService);
    orderDocumentFlowFacade.getOrderSubsequentDocuments.and.returnValue(
      of(subsequentDocumentsData)
    );
    orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
      of(subsequentDocumentEntryData)
    );
    fixture = TestBed.createComponent(OrderDocumentFlowDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialogue when modal is dismissed', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    const closeReason = 'mock close';
    component.close(closeReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(closeReason);
  });

  describe('subsequent documents observable', () => {
    it('should return subsequent document array', (done) => {
      orderDocumentFlowFacade.getOrderSubsequentDocuments.and.returnValue(
        of(subsequentDocumentsData)
      );
      (component as any).orderCode$ = of(orderCode);

      expect(component.documents$).toBeDefined();
      component.documents$
        .subscribe((documents) => {
          expect(documents).toEqual(subsequentDocumentsData);
          done();
        })
        .unsubscribe();
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocuments
      ).toHaveBeenCalled();
    });

    it('should return empty array on error', (done) => {
      orderDocumentFlowFacade.getOrderSubsequentDocuments.and.returnValue(
        throwError(() => 'mockError')
      );
      (component as any).orderCode$ = of(orderCode);

      component.documents$
        .subscribe((documents) => {
          expect(documents).toEqual([]);
          done();
        })
        .unsubscribe();
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocuments
      ).toHaveBeenCalled();
    });

    it('should update loadError signal on error', (done) => {
      orderDocumentFlowFacade.getOrderSubsequentDocuments.and.returnValue(
        throwError(() => 'mockError')
      );
      expect(component.loadError()).toBe(false);

      (component as any).orderCode$ = of(orderCode);
      component.documents$.subscribe(() => done()).unsubscribe();

      expect(component.loadError()).toBe(true);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocuments
      ).toHaveBeenCalled();
    });
  });

  describe('subsequent document entries observable', () => {
    it('should return subsequent document entry array', (done) => {
      orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
        of(subsequentDocumentEntryData)
      );
      (component as any).orderCode$ = of(orderCode);
      fixture.detectChanges();
      component.onDocumentSelection(subsequentDocumentsData[0]);

      expect(component.selectedDocumentEntries$).toBeDefined();
      component.selectedDocumentEntries$
        .subscribe((entries) => {
          expect(entries).toEqual(subsequentDocumentEntryData);
          done();
        })
        .unsubscribe();
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
      ).toHaveBeenCalled();
    });

    it('should return empty array on error', (done) => {
      orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
        throwError(() => 'mockError')
      );
      (component as any).orderCode$ = of(orderCode);
      fixture.detectChanges();
      component.onDocumentSelection(subsequentDocumentsData[0]);

      component.selectedDocumentEntries$
        .subscribe((entries) => {
          expect(entries).toEqual([]);
          done();
        })
        .unsubscribe();
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
      ).toHaveBeenCalled();
    });

    it('should update loadError signal on error', (done) => {
      orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
        throwError(() => 'mockError')
      );
      expect(component.loadError()).toBe(false);

      (component as any).orderCode$ = of(orderCode);
      fixture.detectChanges();
      component.onDocumentSelection(subsequentDocumentsData[0]);

      component.selectedDocumentEntries$.subscribe(() => done()).unsubscribe();

      expect(component.loadError()).toBe(true);
      expect(
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
      ).toHaveBeenCalled();
    });

    describe('cache', () => {
      it('should cache successful fetch', (done) => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
          of(subsequentDocumentEntryData)
        );
        (component as any).orderCode$ = of(orderCode);
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);

        expect(component.selectedDocumentEntries$).toBeDefined();
        component.selectedDocumentEntries$
          .subscribe((entries) => {
            expect(entries).toEqual(subsequentDocumentEntryData);
          })
          .unsubscribe();

        component.selectedDocumentEntries$
          .subscribe((entries) => {
            expect(entries).toEqual(subsequentDocumentEntryData);
            done();
          })
          .unsubscribe();

        expect(
          orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
        ).toHaveBeenCalledTimes(1);
      });
      it('should not cache empty fetch', (done) => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
          of([])
        );
        (component as any).orderCode$ = of(orderCode);
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);

        component.selectedDocumentEntries$.subscribe().unsubscribe();

        component.selectedDocumentEntries$
          .subscribe(() => {
            done();
          })
          .unsubscribe();

        expect(
          orderDocumentFlowFacade.getOrderSubsequentDocumentEntries
        ).toHaveBeenCalledTimes(2);
      });
      it('should not cache on fetch error', (done) => {
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
          throwError(() => 'mockError')
        );
        (component as any).orderCode$ = of(orderCode);
        fixture.detectChanges();
        component.onDocumentSelection(subsequentDocumentsData[0]);

        component.selectedDocumentEntries$.subscribe().unsubscribe();

        component.selectedDocumentEntries$
          .subscribe(() => {
            done();
          })
          .unsubscribe();

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
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
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
        orderDocumentFlowFacade.getOrderSubsequentDocumentEntries.and.returnValue(
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
        orderDocumentFlowFacade.getOrderSubsequentDocuments.and.returnValue(
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
        orderDocumentFlowFacade.getOrderSubsequentDocuments.and.returnValue(
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
