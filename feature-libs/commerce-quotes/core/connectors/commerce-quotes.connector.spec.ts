import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  QuoteAction,
  QuoteDiscount,
  QuoteMetadata,
  QuoteStarter,
} from '../model/commerce-quotes.model';
import { CommerceQuotesAdapter } from './commerce-quotes.adapter';
import { CommerceQuotesConnector } from './commerce-quotes.connector';

import createSpy = jasmine.createSpy;

class MockCommerceQuotesAdapter implements Partial<CommerceQuotesAdapter> {
  getQuotes = createSpy('CommerceQuotesAdapter.getQuotes').and.callFake(
    (userId: string) => of(`getQuotes-${userId}`)
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
      .getQuotes('user1')
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('getQuotes-user1');
    expect(adapter.getQuotes).toHaveBeenCalledWith('user1');
  });

  it('createQuote should call adapter', () => {
    let result;
    const quoteStarter = { cartId: 'cart1', quoteCode: 'quote1' };
    service
      .createQuote('user1', quoteStarter)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`createQuote-user1-${quoteStarter.toString()}`);
    expect(adapter.createQuote).toHaveBeenCalledWith('user1', quoteStarter);
  });

  it('getQuote should call adapter', () => {
    let result;
    service
      .getQuote('user1', 'quoteCode1')
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`getQuote-user1-quoteCode1`);
    expect(adapter.getQuote).toHaveBeenCalledWith('user1', 'quoteCode1');
  });

  it('editQuote should call adapter', () => {
    let result;
    const quoteMetadata = {
      description: 'test',
      expirationTime: new Date(),
      name: 'test1',
    };
    service
      .editQuote('user1', 'quoteCode1', quoteMetadata)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `editQuote-user1-quoteCode1-${quoteMetadata.toString()}`
    );
    expect(adapter.editQuote).toHaveBeenCalledWith(
      'user1',
      'quoteCode1',
      quoteMetadata
    );
  });

  it('performActionQuote should call adapter', () => {
    let result;
    const action = { action: 'TEST' };
    service
      .performActionQuote('user1', 'quoteCode1', action)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `performActionQuote-user1-quoteCode1-${action.toString()}`
    );
    expect(adapter.performActionQuote).toHaveBeenCalledWith(
      'user1',
      'quoteCode1',
      action
    );
  });

  it('addComment should call adapter', () => {
    let result;
    const comment = {
      author: { uid: 'user1', name: 'test' },
      text: 'text',
    };
    service
      .addComment('user1', 'quoteCode1', comment)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`addComment-user1-quoteCode1-${comment.toString()}`);
    expect(adapter.addComment).toHaveBeenCalledWith(
      'user1',
      'quoteCode1',
      comment
    );
  });

  it('addDiscount should call adapter', () => {
    let result;
    const discount = {
      discountRate: 10,
      discountType: 'FIXED',
    };
    service
      .addDiscount('user1', 'quoteCode1', discount)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(`addDiscount-user1-quoteCode1-${discount.toString()}`);
    expect(adapter.addDiscount).toHaveBeenCalledWith(
      'user1',
      'quoteCode1',
      discount
    );
  });

  it('addCartEntryComment should call adapter', () => {
    let result;
    const comment = {
      author: { uid: 'user1', name: 'test' },
      text: 'text',
    };
    service
      .addCartEntryComment('user1', 'quoteCode1', 'entryNumber1', comment)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe(
      `addCartEntryComment-user1-quoteCode1-entryNumber1-${comment.toString()}`
    );
    expect(adapter.addCartEntryComment).toHaveBeenCalledWith(
      'user1',
      'quoteCode1',
      'entryNumber1',
      comment
    );
  });
});
