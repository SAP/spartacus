import { TestBed } from '@angular/core/testing';
import {
  InvoiceQueryParams,
  InvoicesFields,
} from '@spartacus/pdf-invoices/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { PDFInvoicesAdapter } from './pdf-invoices.adapter';
import { PDFInvoicesConnector } from './pdf-invoices.connector';

import createSpy = jasmine.createSpy;

const mockUserId = 'userId1';
const mockOrderId = '15092023';
const mockExternalSystemId = 'IMPERIAL';
const mockInvoiceId = 'Invoice-15-09-2023';
const mockInvoiceQueryParams: InvoiceQueryParams = {
  currentPage: 0,
  pageSize: 10,
  sort: 'invoiceID:asc',
  fields: InvoicesFields.FULL,
};

class MockPDFInvoicesAdapter implements Partial<PDFInvoicesAdapter> {
  getInvoicesForOrder = createSpy(
    'PDFInvoicesAdapter.getInvoicesForOrder'
  ).and.callFake(
    (_userId: string, _orderId: string, _queryParams: InvoiceQueryParams) =>
      of({})
  );
  getInvoicePDF = createSpy('PDFInvoicesAdapter.getInvoicePDF').and.callFake(
    (
      _userId: string,
      _orderId: string,
      _invoiceId: string,
      _externalSystemId?: string
    ) => of({})
  );
}

describe('PDFInvoicesConnector', () => {
  let pdfInvoicesConnector: PDFInvoicesConnector;
  let adapter: PDFInvoicesAdapter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        PDFInvoicesConnector,
        {
          provide: PDFInvoicesAdapter,
          useClass: MockPDFInvoicesAdapter,
        },
      ],
    });

    pdfInvoicesConnector = TestBed.inject(PDFInvoicesConnector);
    adapter = TestBed.inject(PDFInvoicesAdapter);
  });

  it('should be created', () => {
    expect(pdfInvoicesConnector).toBeTruthy();
  });

  it('should call adapter when getInvoicesForOrder is invoked', (done) => {
    let result;
    pdfInvoicesConnector
      .getInvoicesForOrder(mockUserId, mockOrderId, mockInvoiceQueryParams)
      .pipe(take(1))
      .subscribe((res: any) => {
        result = res;
        expect(result).toEqual({});
        done();
      });
    expect(adapter.getInvoicesForOrder).toHaveBeenCalledWith(
      mockUserId,
      mockOrderId,
      mockInvoiceQueryParams
    );
  });

  it('should call adapter when getInvoicePDF is invoked', (done) => {
    let result;
    pdfInvoicesConnector
      .getInvoicePDF(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        mockExternalSystemId
      )
      .pipe(take(1))
      .subscribe((res: any) => {
        result = res;
        expect(result).toEqual({});
        done();
      });
    expect(adapter.getInvoicePDF).toHaveBeenCalledWith(
      mockUserId,
      mockOrderId,
      mockInvoiceId,
      mockExternalSystemId
    );
  });

  it('should call adapter when getInvoicePDF is invoked without externalSystemId', (done) => {
    let result;
    pdfInvoicesConnector
      .getInvoicePDF(mockUserId, mockOrderId, mockInvoiceId)
      .pipe(take(1))
      .subscribe((res: any) => {
        result = res;
        expect(result).toEqual({});
        done();
      });
    expect(adapter.getInvoicePDF).toHaveBeenCalledWith(
      mockUserId,
      mockOrderId,
      mockInvoiceId,
      undefined
    );
  });
});
