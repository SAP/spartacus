import { TestBed } from '@angular/core/testing';
import { PaginationModel } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  QuoteAction,
  QuoteDiscount,
  QuoteMetadata,
  QuoteStarter,
} from '@spartacus/commerce-quotes/root';
import { CommerceQuotesAdapter } from './commerce-quotes.adapter';
import { CommerceQuotesConnector } from './commerce-quotes.connector';

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

class MockCommerceQuotesAdapter implements Partial<CommerceQuotesAdapter> {
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
  performActionQuote = createSpy(
    'CommerceQuotesAdapter.performActionQuote'
  ).and.callFake(
    (userId: string, quoteCode: string, quoteAction: QuoteAction) =>
      of(`performActionQuote-${userId}-${quoteCode}-${quoteAction}`)
  );
  addComment = createSpy('CommerceQuotesAdapter.addComment').and.callFake(
    (userId: string, quoteCode: string, quoteComment: Comment) =>
      of(`addComment-${userId}-${quoteCode}-${quoteComment}`)
  );
  addDiscount = createSpy('CommerceQuotesAdapter.addDiscount').and.callFake(
    (userId: string, quoteCode: string, discount: QuoteDiscount) =>
      of(`addDiscount-${userId}-${quoteCode}-${discount}`)
  );
  addCartEntryComment = createSpy(
    'CommerceQuotesAdapter.addCartEntryComment'
  ).and.callFake(
    (
      userId: string,
      quoteCode: string,
      entryNumber: string,
      comment: Comment
    ) =>
      of(`addCartEntryComment-${userId}-${quoteCode}-${entryNumber}-${comment}`)
  );
}

describe('CommerceQuotesConnector', () => {
  let service: CommerceQuotesConnector;
  let adapter: CommerceQuotesAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommerceQuotesConnector,
        { provide: CommerceQuotesAdapter, useClass: MockCommerceQuotesAdapter },
      ],
    });

    service = TestBed.inject(CommerceQuotesConnector);
    adapter = TestBed.inject(CommerceQuotesAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getQuotes should call adapter', () => {
    let result;
    service
      .getQuotes(userId, pagination)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getQuotes-${userId}-${pagination.toString()}`);
    expect(adapter.getQuotes).toHaveBeenCalledWith(userId, pagination);
  });

  it('createQuote should call adapter', () => {
    let result;
    const quoteStarter = { cartId, quoteCode };
    service
      .createQuote(userId, quoteStarter)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`createQuote-${userId}-${quoteStarter.toString()}`);
    expect(adapter.createQuote).toHaveBeenCalledWith(userId, quoteStarter);
  });

  it('getQuote should call adapter', () => {
    let result;
    service
      .getQuote(userId, quoteCode)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getQuote-${userId}-${quoteCode}`);
    expect(adapter.getQuote).toHaveBeenCalledWith(userId, quoteCode);
  });

  it('editQuote should call adapter', () => {
    let result;
    const quoteMetadata = {
      description: 'test',
      expirationTime: new Date(),
      name: 'test1',
    };
    service
      .editQuote(userId, quoteCode, quoteMetadata)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `editQuote-${userId}-${quoteCode}-${quoteMetadata.toString()}`
    );
    expect(adapter.editQuote).toHaveBeenCalledWith(
      userId,
      quoteCode,
      quoteMetadata
    );
  });

  it('performQuoteAction should call adapter', () => {
    let result;
    const action = QuoteAction.EDIT;
    service
      .performQuoteAction(userId, quoteCode, action)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `performActionQuote-${userId}-${quoteCode}-${action.toString()}`
    );
    expect(adapter.performQuoteAction).toHaveBeenCalledWith(
      userId,
      quoteCode,
      action
    );
  });

  it('addComment should call adapter', () => {
    let result;
    service
      .addComment(userId, quoteCode, comment)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addComment-${userId}-${quoteCode}-${comment.toString()}`
    );
    expect(adapter.addComment).toHaveBeenCalledWith(userId, quoteCode, comment);
  });

  it('addDiscount should call adapter', () => {
    let result;
    const discount = {
      discountRate: 10,
      discountType: 'FIXED',
    };
    service
      .addDiscount(userId, quoteCode, discount)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addDiscount-${userId}-${quoteCode}-${discount.toString()}`
    );
    expect(adapter.addDiscount).toHaveBeenCalledWith(
      userId,
      quoteCode,
      discount
    );
  });

  it('addCartEntryComment should call adapter', () => {
    let result;
    service
      .addCartEntryComment(userId, quoteCode, quoteEntryNumber, comment)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addCartEntryComment-${userId}-${quoteCode}-${quoteEntryNumber}-${comment.toString()}`
    );
    expect(adapter.addCartEntryComment).toHaveBeenCalledWith(
      userId,
      quoteCode,
      'entryNumber1',
      comment
    );
  });
});
