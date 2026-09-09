import { TestBed } from '@angular/core/testing';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  InvoiceQueryParams,
  InvoicesFields,
} from '@spartacus/pdf-invoices/root';
import { firstValueFrom, of } from 'rxjs';
import { vi } from 'vitest';
import { PDFInvoicesConnector } from '../connectors/pdf-invoices.connector';
import { PDFInvoicesService } from './pdf-invoices.service';

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
  getInvoicesForOrder = vi
    .fn()
    .mockImplementation(
      (_userId: string, _orderId: string, _queryParams: InvoiceQueryParams) =>
        of({})
    );
  getInvoicePDF = vi
    .fn()
    .mockImplementation(
      (
        _userId: string,
        _orderId: string,
        _invoiceId: string,
        _externalSystemId?: string
      ) => of(blob)
    );
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = vi.fn().mockReturnValue(of(mockUserId));
}

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = vi.fn().mockReturnValue(
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

    it('should call connector when getInvoicesForOrder is invoked', async () => {
      const result = await firstValueFrom(
        pdfInvoicesService.getInvoicesForOrder(
          mockInvoiceQueryParams,
          mockUserId,
          mockOrderId
        )
      );
      expect(result).toEqual({});
      expect(connector.getInvoicesForOrder).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceQueryParams
      );
    });

    it('should set userId, orderId and call connector when getInvoicesForOrder is invoked without userId and orderId', async () => {
      const result = await firstValueFrom(
        pdfInvoicesService.getInvoicesForOrder(mockInvoiceQueryParams)
      );
      expect(result).toEqual({});
      expect(connector.getInvoicesForOrder).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceQueryParams
      );
    });

    it('should call connector when getInvoicePDF is invoked', async () => {
      const result = await firstValueFrom(
        pdfInvoicesService.getInvoicePDF(
          mockInvoiceId,
          mockExternalSystemId,
          mockUserId,
          mockOrderId
        )
      );
      expect(result).toEqual(blob);
      expect(connector.getInvoicePDF).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        mockExternalSystemId
      );
    });

    it('should call connector when getInvoicePDF is invoked without externalSystemId', async () => {
      const result = await firstValueFrom(
        pdfInvoicesService.getInvoicePDF(
          mockInvoiceId,
          undefined,
          mockUserId,
          mockOrderId
        )
      );
      expect(result).toEqual(blob);
      expect(connector.getInvoicePDF).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        undefined
      );
    });

    it('should set userId, orderId and call connector when getInvoicePDF is invoked without userId, orderId, externalSystemId', async () => {
      const result = await firstValueFrom(
        pdfInvoicesService.getInvoicePDF(mockInvoiceId)
      );
      expect(result).toEqual(blob);
      expect(connector.getInvoicePDF).toHaveBeenCalledWith(
        mockUserId,
        mockOrderId,
        mockInvoiceId,
        undefined
      );
    });
  });
});
