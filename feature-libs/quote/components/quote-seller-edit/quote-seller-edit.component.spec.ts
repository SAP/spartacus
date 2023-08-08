import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  QuoteFacade,
  Quote,
  QuoteActionType,
  QuoteState,
  QuoteDiscount,
  QuoteDiscountType,
} from '@spartacus/quote/root';
import { I18nTestingModule, Price } from '@spartacus/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { QuoteSellerEditComponent } from './quote-seller-edit.component';
import createSpy = jasmine.createSpy;
import {
  QUOTE_CODE,
  createEmptyQuote,
} from '../../core/testing/quote-test-utils';
import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';

const mockCartId = '1234';

const threshold = 20;
const totalPrice: Price = { value: threshold + 1 };

const mockQuote: Quote = {
  ...createEmptyQuote(),
  allowedActions: [
    { type: QuoteActionType.EDIT, isPrimary: false },
    { type: QuoteActionType.REQUOTE, isPrimary: true },
  ],
  state: QuoteState.SELLER_DRAFT,
  cartId: mockCartId,
  code: QUOTE_CODE,
  threshold: threshold,
  totalPrice: totalPrice,
};

const mockQuoteDetails$ = new BehaviorSubject<Quote>(mockQuote);

class MockCommerceQuotesFacade implements Partial<QuoteFacade> {
  getQuoteDetails(): Observable<Quote> {
    return mockQuoteDetails$.asObservable();
  }
  addDiscount = createSpy();
}

class MockQuoteSellerEditComponentService {
  parseDiscountValue() {
    return of(0);
  }
  getFormatter() {
    return of(
      new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      })
    );
  }
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
        {
          provide: QuoteSellerEditComponentService,
          useClass: MockQuoteSellerEditComponentService,
        },
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

  it('should emit data for in case seller status is provided', (done) => {
    component.quoteDetailsForSeller$
      .subscribe((quote) => {
        expect(quote.code).toBe(QUOTE_CODE);
        done();
      })
      .unsubscribe();
  });

  describe('isSeller', () => {
    it('should assign SELLER_DRAFT to seller role', () => {
      expect(component['isSeller'](QuoteState.SELLER_DRAFT)).toBe(true);
    });

    it('should assign SELLER_REQUEST to seller role', () => {
      expect(component['isSeller'](QuoteState.SELLER_REQUEST)).toBe(true);
    });
  });

  describe('onApply', () => {
    it('should call corresponding facade method', () => {
      component.form.controls.discount.setValue(0);
      const expectedDiscount: QuoteDiscount = {
        discountRate: component.form.controls.discount.value,
        discountType: QuoteDiscountType.ABSOLUTE,
      };
      component.onApply(QUOTE_CODE);
      expect(facade.addDiscount).toHaveBeenCalledWith(
        QUOTE_CODE,
        expectedDiscount
      );
    });
  });
});
