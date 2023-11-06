import { TestBed } from '@angular/core/testing';
import { PaginationModel } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  QuoteActionType,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/quote/root';
import { QuoteAdapter } from './quote.adapter';
import { QuoteConnector } from './quote.connector';

import createSpy = jasmine.createSpy;

const userId = 'user1';
const cartId = 'cart1';
const quoteCode = 'quote1';
const quoteEntryNumber = 'entryNumber1';
const pagination = {
  currentPage: 1,
  pageSize: 20,
  sort: 'byName',
};
const comment = {
  author: { uid: userId, name: 'test' },
  text: 'text',
};

class MockCommerceQuotesAdapter implements Partial<QuoteAdapter> {
  getQuotes = createSpy('CommerceQuotesAdapter.getQuotes').and.callFake(
    (userId: string, pagination: PaginationModel) =>
      of(`getQuotes-${userId}-${pagination}`)
  );
  createQuote = createSpy('CommerceQuotesAdapter.createQuote').and.callFake(
    (userId: string, quoteStarter: QuoteStarter) =>
      of(`createQuote-${userId}-${quoteStarter}`)
  );
  getQuote = createSpy('CommerceQuotesAdapter.getQuote').and.callFake(
    (userId: string, quoteCode: string) => of(`getQuote-${userId}-${quoteCode}`)
  );
  editQuote = createSpy('CommerceQuotesAdapter.editQuote').and.callFake(
    (userId: string, quoteCode: string, quoteMetadata: QuoteMetadata) =>
      of(`editQuote-${userId}-${quoteCode}-${quoteMetadata}`)
  );
  performQuoteAction = createSpy(
    'CommerceQuotesAdapter.performQuoteAction'
  ).and.callFake(
    (userId: string, quoteCode: string, quoteAction: QuoteActionType) =>
      of(`performQuoteAction-${userId}-${quoteCode}-${quoteAction}`)
  );
  addComment = createSpy('CommerceQuotesAdapter.addComment').and.callFake(
    (userId: string, quoteCode: string, quoteComment: Comment) =>
      of(`addComment-${userId}-${quoteCode}-${quoteComment}`)
  );
  addDiscount = createSpy('CommerceQuotesAdapter.addDiscount').and.callFake(
    (userId: string, quoteCode: string, discount: QuoteDiscount) =>
      of(`addDiscount-${userId}-${quoteCode}-${discount}`)
  );
  addQuoteEntryComment = createSpy(
    'CommerceQuotesAdapter.addQuoteEntryComment'
  ).and.callFake(
    (
      userId: string,
      quoteCode: string,
      entryNumber: string,
      comment: Comment
    ) =>
      of(
        `addQuoteEntryComment-${userId}-${quoteCode}-${entryNumber}-${comment}`
      )
  );
}

describe('QuoteConnector', () => {
  let classUnderTest: QuoteConnector;
  let quoteAdapter: QuoteAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteConnector,
        { provide: QuoteAdapter, useClass: MockCommerceQuotesAdapter },
      ],
    });

    classUnderTest = TestBed.inject(QuoteConnector);
    quoteAdapter = TestBed.inject(QuoteAdapter);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('getQuotes should call adapter', () => {
    let result;
    classUnderTest
      .getQuotes(userId, pagination)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getQuotes-${userId}-${pagination.toString()}`);
    expect(quoteAdapter.getQuotes).toHaveBeenCalledWith(userId, pagination);
  });

  it('createQuote should call adapter', () => {
    let result;
    const quoteStarter = { cartId, quoteCode };
    classUnderTest
      .createQuote(userId, quoteStarter)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`createQuote-${userId}-${quoteStarter.toString()}`);
    expect(quoteAdapter.createQuote).toHaveBeenCalledWith(userId, quoteStarter);
  });

  it('getQuote should call adapter', () => {
    let result;
    classUnderTest
      .getQuote(userId, quoteCode)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getQuote-${userId}-${quoteCode}`);
    expect(quoteAdapter.getQuote).toHaveBeenCalledWith(userId, quoteCode);
  });

  it('editQuote should call adapter', () => {
    let result;
    const quoteMetadata = {
      description: 'test',
      expirationTime: new Date().toString(),
      name: 'test1',
    };
    classUnderTest
      .editQuote(userId, quoteCode, quoteMetadata)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `editQuote-${userId}-${quoteCode}-${quoteMetadata.toString()}`
    );
    expect(quoteAdapter.editQuote).toHaveBeenCalledWith(
      userId,
      quoteCode,
      quoteMetadata
    );
  });

  it('performQuoteAction should call adapter', () => {
    let result;
    const action = QuoteActionType.EDIT;
    classUnderTest
      .performQuoteAction(userId, quoteCode, action)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `performQuoteAction-${userId}-${quoteCode}-${action.toString()}`
    );
    expect(quoteAdapter.performQuoteAction).toHaveBeenCalledWith(
      userId,
      quoteCode,
      action
    );
  });

  it('addComment should call adapter', () => {
    let result;
    classUnderTest
      .addComment(userId, quoteCode, comment)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addComment-${userId}-${quoteCode}-${comment.toString()}`
    );
    expect(quoteAdapter.addComment).toHaveBeenCalledWith(
      userId,
      quoteCode,
      comment
    );
  });

  it('addDiscount should call adapter', () => {
    let result;
    const discount = {
      discountRate: 10,
      discountType: QuoteDiscountType.ABSOLUTE,
    };
    classUnderTest
      .addDiscount(userId, quoteCode, discount)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addDiscount-${userId}-${quoteCode}-${discount.toString()}`
    );
    expect(quoteAdapter.addDiscount).toHaveBeenCalledWith(
      userId,
      quoteCode,
      discount
    );
  });

  it('addQuoteEntryComment should call adapter', () => {
    let result;
    classUnderTest
      .addQuoteEntryComment(userId, quoteCode, quoteEntryNumber, comment)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addQuoteEntryComment-${userId}-${quoteCode}-${quoteEntryNumber}-${comment.toString()}`
    );
    expect(quoteAdapter.addQuoteEntryComment).toHaveBeenCalledWith(
      userId,
      quoteCode,
      'entryNumber1',
      comment
    );
  });
});
