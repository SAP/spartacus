import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
} from '@spartacus/core';
import { PDFInvoicesBadRequestHandler } from './pdf-invoices-badrequest.handler';

class MockGlobalMessageService {
  add() {}
}

const MockRequest = {} as HttpRequest<any>;

const MockNoOrderIdBadRequestResponse = {
  error: {
    errors: [
      {
        message:
          'Order with guid [15092023] not found for current user in current BaseStore',
        type: 'UnknownIdentifierError',
      },
    ],
  },
} as HttpErrorResponse;

const MockDownloadPDFBadRequestResponse = {
  error: {
    errors: [
      {
        message: 'Invoice with id [Imperial] not found for order [15092023]',
        type: 'UnknownIdentifierError',
      },
    ],
  },
} as HttpErrorResponse;

describe('PDFInvoicesDateBadRequestHandler', () => {
  let pdfInvoicesBRHandler: PDFInvoicesBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PDFInvoicesBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    pdfInvoicesBRHandler = TestBed.inject(PDFInvoicesBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(pdfInvoicesBRHandler).toBeTruthy();
  });

  it('should register 400 responseStatus ', () => {
    expect(pdfInvoicesBRHandler.responseStatus).toEqual(
      HttpResponseStatus.BAD_REQUEST
    );
  });

  it('should handle invalid order id bad request', () => {
    spyOn(globalMessageService, 'add');
    pdfInvoicesBRHandler.handleError(
      MockRequest,
      MockNoOrderIdBadRequestResponse
    );

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'pdfInvoices.invoicesLoadingError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle invoice download bad request', () => {
    spyOn(globalMessageService, 'add');
    pdfInvoicesBRHandler.handleError(
      MockRequest,
      MockDownloadPDFBadRequestResponse
    );

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'pdfInvoices.downloadPDFError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
