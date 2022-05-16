import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  QuoteList,
  QUOTE_LIST_NORMALIZER,
  Quote,
  QUOTE_NORMALIZER,
  QUOTE_STARTER_SERIALIZER,
  Comment,
  QUOTE_METADATA_SERIALIZER,
  QUOTE_ACTION_SERIALIZER,
  QuoteStarter,
  QuoteMetadata,
  QuoteAction,
  QUOTE_COMMENT_SERIALIZER,
  QuoteDiscount,
  QUOTE_DISCOUNT_SERIALIZER,
} from '@spartacus/commerce-quotes/core';
import { ConverterService, OccConfig, OccEndpoints } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { OccCommerceQuotesAdapter } from './occ-commerce-quotes.adapter';

const userId = '111111';
const cartId = '222222';
const mockQuote: Quote = {
  allowedActions: ['EDIT'],
  cartId: cartId,
  code: '333333',
};

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
        performActionQuote: '/users/${userId}/quotes/${quoteCode}/action',
        addComment: '/users/${userId}/quotes/${quoteCode}/comments',
        addDiscount: '/users/${userId}/quotes/${quoteCode}/discounts',
        addCartEntryComment:
          '/users/${userId}/quotes/${quoteCode}/entries/${entryNumber}/comments',
      } as OccEndpoints,
    },
  },
};

describe(`OccCheckoutDeliveryModesAdapter`, () => {
  let service: OccCommerceQuotesAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCommerceQuotesAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCommerceQuotesAdapter);
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
    const mockQuoteList: QuoteList = {
      pagination: {
        currentPage: 1,
        pageSize: 20,
      },
      quotes: [mockQuote],
    };

    service
      .getQuotes(userId)
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockQuoteList);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === `/users/${userId}/quotes`;
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockQuoteList);
    expect(converter.pipeable).toHaveBeenCalledWith(QUOTE_LIST_NORMALIZER);
  });

  it('createQuote should create quote based on provided cartId', (done) => {
    const mockQuoteStarter: QuoteStarter = {
      cartId,
    };

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
    const mockQuoteMetadata: QuoteMetadata = {
      description: 'test',
      name: 'Test1',
    };

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

  it('performActionQuote should send action to be performed for quote', (done) => {
    const mockQuoteAction: QuoteAction = {
      action: 'SUBMIT',
    };

    service
      .performActionQuote(userId, mockQuote.code, mockQuoteAction)
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
    const mockQuoteComment: Comment = {
      text: 'test',
    };

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
    const mockQuoteDiscount: QuoteDiscount = {
      discountRate: 12,
      discountType: 'FIXED',
    };

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
    const mockQuoteEntryComment: Comment = {
      text: 'test',
    };
    const productEntryNumber = '1';

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
