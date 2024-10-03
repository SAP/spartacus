import { TestBed } from '@angular/core/testing';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  InvoiceQueryParams,
  InvoicesFields,
} from '@spartacus/pdf-invoices/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { PDFInvoicesConnector } from '../connectors/pdf-invoices.connector';
import { PDFInvoicesService } from './pdf-invoices.service';

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

const blob = new Blob();

class MockPDFInvoicesConnector implements Partial<PDFInvoicesConnector> {
  getInvoicesForOrder = createSpy(
    'PDFInvoicesConnector.getInvoicesForOrder'
  ).and.callFake(
    (_userId: string, _orderId: string, _queryParams: InvoiceQueryParams) =>
      of({})
  );
  getInvoicePDF = createSpy('PDFInvoicesConnector.getInvoicePDF').and.callFake(
    (
      _userId: string,
      _orderId: string,
      _invoiceId: string,
      _externalSystemId?: string
    ) => of(blob)
  );
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy('UserIdService.takeUserId').and.returnValue(
    of(mockUserId)
  );
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy('RoutingService.getRouterState').and.returnValue(
    of({
      state: {
        semanticRoute: 'orders',
        params: { orderCode: mockOrderId },
      },
    })
  );
}

describe('PDFInvoicesService', () => {
  let pdfInvoicesService: PDFInvoicesService;
  let connector: PDFInvoicesConnector;

  describe('Current user', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PDFInvoicesService,
          {
            provide: PDFInvoicesConnector,
            useClass: MockPDFInvoicesConnector,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      });

      pdfInvoicesService = TestBed.inject(PDFInvoicesService);
      connector = TestBed.inject(PDFInvoicesConnector);
    });

    it('should be created', () => {
      expect(pdfInvoicesService).toBeTruthy();
    });

    it('should call connector when getInvoicesForOrder is invoked', (done) => {
      let result;
      pdfInvoicesService
        .getInvoicesForOrder(mockInvoiceQueryParams, mockUserId, mockOrderId)
        .pipe(take(1))
        .subscribe((res: any) => {
          result = res;
          expect(result).toEqual({});
          done();
        });
      expect(connector.getInvoicesForOrder).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceQueryParams
      );
    });

    it('should set userId, orderId and call connector when getInvoicesForOrder is invoked without userId and orderId', (done) => {
      let result;
      pdfInvoicesService
        .getInvoicesForOrder(mockInvoiceQueryParams)
        .pipe(take(1))
        .subscribe((res: any) => {
          result = res;
          expect(result).toEqual({});
          done();
        });
      expect(connector.getInvoicesForOrder).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceQueryParams
      );
    });

    it('should call connector when getInvoicePDF is invoked', (done) => {
      let result;
      pdfInvoicesService
        .getInvoicePDF(
          mockInvoiceId,
          mockExternalSystemId,
          mockUserId,
          mockOrderId
        )
        .pipe(take(1))
        .subscribe((res: any) => {
          result = res;
          expect(result).toEqual(blob);
          done();
        });
      expect(connector.getInvoicePDF).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        mockExternalSystemId
      );
    });

    it('should call connector when getInvoicePDF is invoked without externalSystemId', (done) => {
      let result;
      pdfInvoicesService
        .getInvoicePDF(mockInvoiceId, undefined, mockUserId, mockOrderId)
        .pipe(take(1))
        .subscribe((res: any) => {
          result = res;
          expect(result).toEqual(blob);
          done();
        });
      expect(connector.getInvoicePDF).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        undefined
      );
    });

    it('should set userId, orderId and call connector when getInvoicePDF is invoked without userId, orderId, externalSystemId', (done) => {
      let result;
      pdfInvoicesService
        .getInvoicePDF(mockInvoiceId)
        .pipe(take(1))
        .subscribe((res: any) => {
          result = res;
          expect(result).toEqual(blob);
          done();
        });
      expect(connector.getInvoicePDF).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        undefined
      );
    });
  });
});
