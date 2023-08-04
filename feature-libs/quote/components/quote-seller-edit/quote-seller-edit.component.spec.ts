import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/quote/root';
import {
  GlobalMessageService,
  I18nTestingModule,
  Price,
  TranslationService,
} from '@spartacus/core';

import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';

import { QuoteSellerEditComponent } from './quote-seller-edit.component';
import createSpy = jasmine.createSpy;
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';

const mockCartId = '1234';
const mockCode = '3333';
const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.BUYER_DRAFT,
  cartId: mockCartId,
  code: mockCode,
  threshold: threshold,
  totalPrice: totalPrice,
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);

const dialogClose$ = new BehaviorSubject<any | undefined>(undefined);
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(reason: any): void {
    dialogClose$.next(reason);
  }
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }
  get dialogClose() {
    return dialogClose$.asObservable();
  }
}

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
  performQuoteAction(
    _quoteCode: string,
    _quoteAction: QuoteActionType
  ): Observable<unknown> {
    return EMPTY;
  }
  requote = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

class MockGlobalMessageService {
  add(): void {}
}

describe('QuoteSellerEditComponent', () => {
  let fixture: ComponentFixture<QuoteSellerEditComponent>;
  let component: QuoteSellerEditComponent;
  let facade: QuoteFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [QuoteSellerEditComponent],
      providers: [
        {
          provide: QuoteFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSellerEditComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(QuoteFacade);
    mockQuoteDetails$.next(mockQuote);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(facade).toBeDefined();
  });
});
