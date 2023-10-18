import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { MyAccountV2DownloadInvoicesComponent } from './my-account-v2-download-invoices.component';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  I18nModule,
  LanguageService,
  Translatable,
  TranslationService,
} from '@spartacus/core';
import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InvoicesListComponent } from '@spartacus/pdf-invoices/components';
import { PDFInvoicesModule } from '@spartacus/pdf-invoices';
import {
  InvoiceQueryParams,
  OrderInvoiceList,
  PDFInvoicesFacade,
} from '@spartacus/pdf-invoices/root';

const invoiceCount = 4;
const invoicesEvent = {
  order: { code: 'order1' },
};
class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}
class MockPDFInvoicesFacade implements Partial<PDFInvoicesFacade> {
  getInvoicesForOrder(
    _params: InvoiceQueryParams,
    _userId?: string,
    _orderId?: string
  ): Observable<OrderInvoiceList> {
    return of({
      invoices: [],
      pagination: { totalCount: invoiceCount },
      sorts: [],
    });
  }
  getInvoicePDF(
    _invoiceId: string,
    _externalSystemId?: string,
    _userId?: string,
    _orderId?: string
  ): Observable<Blob> {
    return EMPTY;
  }
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  data$ = of(invoicesEvent);
  closeDialog = createSpy();
}
class MockLanguageService {
  getActive(): Observable<string> {
    return of('en');
  }
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}
describe('MyAccountV2DownloadInvoicesComponent', () => {
  let component: MyAccountV2DownloadInvoicesComponent;
  let fixture: ComponentFixture<MyAccountV2DownloadInvoicesComponent>;
  let launchService: LaunchDialogService;
  let invoiceComponent: InvoicesListComponent;
  let fixture2: ComponentFixture<InvoicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule, PDFInvoicesModule],
      providers: [
        ChangeDetectorRef,
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: PDFInvoicesFacade, useClass: MockPDFInvoicesFacade },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
      declarations: [
        MyAccountV2DownloadInvoicesComponent,
        InvoicesListComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MyAccountV2DownloadInvoicesComponent);
    fixture2 = TestBed.createComponent(InvoicesListComponent);
    launchService = TestBed.inject(LaunchDialogService);
    component = fixture.componentInstance;
    invoiceComponent = fixture2.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show no-invoices message', () => {
    component.invoiceCount = 0;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#noInvoice'));
    expect(el).not.toBeNull();
  });
  it('should not show no-invoices message', () => {
    component.invoiceCount = 10;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#noInvoice'));
    expect(el).toBeNull();
  });
  it('should show spinner', () => {
    component.invoiceCount = undefined;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('cx-spinner'));
    expect(el).not.toBeNull();
  });
  it('should close the dialog', () => {
    launchService.closeDialog = createSpy().and.stub();
    component.close();
    expect(launchService.closeDialog).toHaveBeenCalled();
  });
  it('fetch invoices list count', () => {
    invoiceComponent.queryParams$ = new BehaviorSubject<InvoiceQueryParams>({});
    component.ngAfterViewChecked();
    expect(component.invoiceCount).toEqual(invoiceCount);
  });
});
