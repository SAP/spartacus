import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccConfig, OccEndpoints } from '@spartacus/core';
import {
  QUOTE_ACTION_SERIALIZER,
  QUOTE_COMMENT_SERIALIZER,
  QUOTE_DISCOUNT_SERIALIZER,
  QUOTE_LIST_NORMALIZER,
  QUOTE_METADATA_SERIALIZER,
  QUOTE_NORMALIZER,
  QUOTE_STARTER_SERIALIZER,
} from '@spartacus/quote/core';
import {
  QuoteComment,
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/quote/root';
import { take } from 'rxjs/operators';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { OccQuoteAdapter } from './occ-quote.adapter';

const userId = '111111';
const cartId = '222222';
const mockAction = { type: QuoteActionType.CREATE, isPrimary: false };

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [mockAction],
  cartId: cartId,
};
const vendorQuote: Quote = {
  ...mockQuote,
  sapAttachments: [
    {
      id: mockQuote.code,
    },
  ],
};
const pagination = {
  currentPage: 1,
  pageSize: 20,
  sort: 'byName',
};
const mockQuoteList: QuoteList = {
  pagination,
  sorts: [{ code: 'byDate' }],
  quotes: [mockQuote],
};
const mockQuoteStarter: QuoteStarter = {
  cartId,
};
const mockQuoteMetadata: QuoteMetadata = {
  description: 'test',
  name: 'Test1',
};
const mockQuoteAction = QuoteActionType.SUBMIT;
const mockQuoteComment: QuoteComment = {
  text: 'test',
};
const mockQuoteDiscount: QuoteDiscount = {
  discountRate: 12,
  discountType: QuoteDiscountType.ABSOLUTE,
};
const mockQuoteEntryComment: QuoteComment = {
  text: 'test',
};
const productEntryNumber = '1';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        getQuotes: '/users/${userId}/quotes',
        createQuote: '/users/${userId}/quotes',
        getQuote: '/users/${userId}/quotes/${quoteCode}',
        editQuote: '/users/${userId}/quotes/${quoteCode}',
        performQuoteAction: '/users/${userId}/quotes/${quoteCode}/action',
        addComment: '/users/${userId}/quotes/${quoteCode}/comments',
        addDiscount: '/users/${userId}/quotes/${quoteCode}/discounts',
        addQuoteEntryComment:
          '/users/${userId}/quotes/${quoteCode}/entries/${entryNumber}/comments',
        downloadAttachment:
          'users/${userId}/quotes/${quoteCode}/attachments/${attachmentId}',
      } as OccEndpoints,
    },
  },
};

const mockQuoteAttachment = (): File => {
  const blob = new Blob([''], { type: 'application/pdf' });
  return blob as File;
};

describe(`OccQuoteAdapter`, () => {
  let classUnderTest: OccQuoteAdapter;
  let httpTestingController: HttpTestingController;
  let converterService: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccQuoteAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    classUnderTest = TestBed.inject(OccQuoteAdapter);
    httpTestingController = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'pipeableMany').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getQuotes should return users quotes list', (done) => {
    classUnderTest
      .getQuotes(userId, pagination)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuoteList);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(
        req,
        'GET',
        `?pageSize=${pagination.pageSize}&currentPage=${pagination.currentPage}&sort=${pagination.sort}`
      )
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuoteList);
    expect(converterService.pipeable).toHaveBeenCalledWith(
      QUOTE_LIST_NORMALIZER
    );
  });

  it('createQuote should create quote based on provided cartId', (done) => {
    classUnderTest
      .createQuote(userId, mockQuoteStarter)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuote);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'POST', '')
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuote);
    expect(converterService.pipeable).toHaveBeenCalledWith(QUOTE_NORMALIZER);
    expect(converterService.convert).toHaveBeenCalledWith(
      mockQuoteStarter,
      QUOTE_STARTER_SERIALIZER
    );
  });

  it('getQuote should return quote details based on provided quoteCode', (done) => {
    classUnderTest
      .getQuote(userId, mockQuote.code)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuote);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'GET')
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuote);
    expect(converterService.pipeable).toHaveBeenCalledWith(QUOTE_NORMALIZER);
  });

  it('getQuote should call httpErrorHandler on error', (done) => {
    classUnderTest
      .getQuote(userId, mockQuote.code)
      .pipe(take(1))
      .subscribe(
        () => {
          fail('error expected');
        },
        (error) => {
          expect(isErrorNormalized(error)).toBe(true);
          done();
        }
      );

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'GET')
    );
    mockReq.flush("quote id 'undefined' not found", {
      status: 400,
      statusText: 'Bad request',
    });
  });

  it('editQuote should editQuote quote', (done) => {
    classUnderTest
      .editQuote(userId, mockQuote.code, mockQuoteMetadata)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'PATCH')
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converterService.convert).toHaveBeenCalledWith(
      mockQuoteMetadata,
      QUOTE_METADATA_SERIALIZER
    );
  });

  it('performQuoteAction should send action to be performed for quote', (done) => {
    classUnderTest
      .performQuoteAction(userId, mockQuote.code, mockQuoteAction)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'POST', `/${mockQuote.code}/action`)
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converterService.convert).toHaveBeenCalledWith(
      mockQuoteAction,
      QUOTE_ACTION_SERIALIZER
    );
  });

  it('addComment should add comment to quote', (done) => {
    classUnderTest
      .addComment(userId, mockQuote.code, mockQuoteComment)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'POST', `/${mockQuote.code}/comments`)
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converterService.convert).toHaveBeenCalledWith(
      mockQuoteComment,
      QUOTE_COMMENT_SERIALIZER
    );
  });

  it('addDiscount should add discount to quote', (done) => {
    classUnderTest
      .addDiscount(userId, mockQuote.code, mockQuoteDiscount)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(req, 'POST', `/${mockQuote.code}/discounts`)
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converterService.convert).toHaveBeenCalledWith(
      mockQuoteDiscount,
      QUOTE_DISCOUNT_SERIALIZER
    );
  });

  it('addQuoteEntryComment should add comment to product entry in quote cart', (done) => {
    classUnderTest
      .addQuoteEntryComment(
        userId,
        mockQuote.code,
        productEntryNumber,
        mockQuoteEntryComment
      )
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpTestingController.expectOne((req) =>
      isQuoteReq(
        req,
        'POST',
        `/${mockQuote.code}/entries/${productEntryNumber}/comments`
      )
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converterService.convert).toHaveBeenCalledWith(
      mockQuoteEntryComment,
      QUOTE_COMMENT_SERIALIZER
    );
  });

  describe('downloadAttachment', () => {
    it('should download proposal document based on provided quoteCode and attachmentId', (done) => {
      const vendorQuoteCode = vendorQuote.code;
      const vendorQuoteAttachmentId = vendorQuote.sapAttachments[0].id;

      classUnderTest
        .downloadAttachment(userId, vendorQuoteCode, vendorQuoteAttachmentId)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(mockQuoteAttachment());
          done();
        });

      const mockReq = httpTestingController.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            `users/${userId}/quotes/${vendorQuoteCode}/attachments/${vendorQuoteAttachmentId}`
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('blob');
      mockReq.flush(mockQuoteAttachment());
    });

    it('should call httpErrorHandler on error', (done) => {
      const vendorQuoteCode = vendorQuote.code;
      const vendorQuoteAttachmentId = vendorQuote.sapAttachments[0].id;

      classUnderTest
        .downloadAttachment(userId, vendorQuoteCode, vendorQuoteAttachmentId)
        .pipe(take(1))
        .subscribe({
          next: () => {
            fail('error expected');
          },
          error: (error) => {
            expect(isErrorNormalized(error)).toBe(true);
            done();
          },
        });

      const mockReq = httpTestingController.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            `users/${userId}/quotes/${vendorQuoteCode}/attachments/${vendorQuoteAttachmentId}`
      );
      mockReq.flush(mockQuoteAttachment(), {
        status: 400,
        statusText: 'Bad request',
      });
    });
  });

  function isErrorNormalized(error: any): boolean {
    // normalizer converts HttpErrorResponse into HttpErrorModel
    return error.constructor.name === 'HttpErrorModel';
  }

  function isQuoteReq(
    req: HttpRequest<any>,
    httpMethod: 'GET' | 'POST' | 'PATCH',
    routeSuffix?: string
  ): boolean {
    return (
      req.method === httpMethod &&
      req.url ===
        `/users/${userId}/quotes${routeSuffix ?? '/' + mockQuote.code}`
    );
  }
});
