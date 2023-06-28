import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  QUOTE_LIST_NORMALIZER,
  QUOTE_NORMALIZER,
  QUOTE_STARTER_SERIALIZER,
  QUOTE_METADATA_SERIALIZER,
  QUOTE_ACTION_SERIALIZER,
  QUOTE_COMMENT_SERIALIZER,
  QUOTE_DISCOUNT_SERIALIZER,
} from '@spartacus/quote/core';
import {
  Quote,
  QuoteActionType,
  QuoteDiscount,
  QuoteList,
  QuoteMetadata,
  QuoteStarter,
  Comment,
} from '@spartacus/quote/root';
import { ConverterService, OccConfig, OccEndpoints } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { OccQuoteAdapter } from './occ-quote.adapter';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';

const userId = '111111';
const cartId = '222222';
const mockAction = { type: QuoteActionType.CREATE, isPrimary: false };

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [mockAction],
  cartId: cartId,
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
const mockQuoteComment: Comment = {
  text: 'test',
};
const mockQuoteDiscount: QuoteDiscount = {
  discountRate: 12,
  discountType: 'FIXED',
};
const mockQuoteEntryComment: Comment = {
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
        addCartEntryComment:
          '/users/${userId}/quotes/${quoteCode}/entries/${entryNumber}/comments',
      } as OccEndpoints,
    },
  },
};

describe(`OccQuoteAdapter`, () => {
  let service: OccQuoteAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccQuoteAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccQuoteAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getQuotes should return users quotes list', (done) => {
    service
      .getQuotes(userId, pagination)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuoteList);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url ===
          `/users/${userId}/quotes?pageSize=${pagination.pageSize}&currentPage=${pagination.currentPage}&sort=${pagination.sort}`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuoteList);
    expect(converter.pipeable).toHaveBeenCalledWith(QUOTE_LIST_NORMALIZER);
  });

  it('createQuote should create quote based on provided cartId', (done) => {
    service
      .createQuote(userId, mockQuoteStarter)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuote);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === `/users/${userId}/quotes`;
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuote);
    expect(converter.pipeable).toHaveBeenCalledWith(QUOTE_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      mockQuoteStarter,
      QUOTE_STARTER_SERIALIZER
    );
  });

  it('getQuote should return quote details based on provided quoteCode', (done) => {
    service
      .getQuote(userId, mockQuote.code)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuote);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === `/users/${userId}/quotes/${mockQuote.code}`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuote);
    expect(converter.pipeable).toHaveBeenCalledWith(QUOTE_NORMALIZER);
  });

  it('editQuote should editQuote quote', (done) => {
    service
      .editQuote(userId, mockQuote.code, mockQuoteMetadata)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PATCH' &&
        req.url === `/users/${userId}/quotes/${mockQuote.code}`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converter.convert).toHaveBeenCalledWith(
      mockQuoteMetadata,
      QUOTE_METADATA_SERIALIZER
    );
  });

  it('performQuoteAction should send action to be performed for quote', (done) => {
    service
      .performQuoteAction(userId, mockQuote.code, mockQuoteAction)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url === `/users/${userId}/quotes/${mockQuote.code}/action`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converter.convert).toHaveBeenCalledWith(
      mockQuoteAction,
      QUOTE_ACTION_SERIALIZER
    );
  });

  it('addComment should add comment to quote', (done) => {
    service
      .addComment(userId, mockQuote.code, mockQuoteComment)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url === `/users/${userId}/quotes/${mockQuote.code}/comments`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converter.convert).toHaveBeenCalledWith(
      mockQuoteComment,
      QUOTE_COMMENT_SERIALIZER
    );
  });

  it('addDiscount should add discount to quote', (done) => {
    service
      .addDiscount(userId, mockQuote.code, mockQuoteDiscount)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(null);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url === `/users/${userId}/quotes/${mockQuote.code}/discounts`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converter.convert).toHaveBeenCalledWith(
      mockQuoteDiscount,
      QUOTE_DISCOUNT_SERIALIZER
    );
  });

  it('addCartEntryComment should add comment to product entry in quote cart', (done) => {
    service
      .addCartEntryComment(
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

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url ===
          `/users/${userId}/quotes/${mockQuote.code}/entries/${productEntryNumber}/comments`
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null);
    expect(converter.convert).toHaveBeenCalledWith(
      mockQuoteEntryComment,
      QUOTE_COMMENT_SERIALIZER
    );
  });
});
