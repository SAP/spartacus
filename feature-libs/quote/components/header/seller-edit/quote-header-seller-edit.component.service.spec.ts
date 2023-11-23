import { TestBed } from '@angular/core/testing';

import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CurrencyService, LanguageService, TimeUtils } from '@spartacus/core';
import { Quote, QuoteState } from '@spartacus/quote/root';
import { Observable, of } from 'rxjs';
import {
  EXPIRATION_DATE_AS_STRING,
  EXPIRATION_TIME_AS_STRING,
  createEmptyQuote,
} from '../../../core/testing/quote-test-utils';
import { QuoteHeaderSellerEditComponentService } from './quote-header-seller-edit.component.service';

const TOTAL_PRICE = 1000;
const DISCOUNT_RATE = 10000;
class MockCurrencyService {
  getActive(): Observable<string> {
    return of('USD');
  }
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en');
  }
}

describe('QuoteHeaderSellerEditComponentService', () => {
  let classUnderTest: QuoteHeaderSellerEditComponentService;
  let quote: Quote;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CurrencyService, useClass: MockCurrencyService },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    classUnderTest = TestBed.inject(QuoteHeaderSellerEditComponentService);
    quote = {
      ...createEmptyQuote(),
      totalPrice: { value: TOTAL_PRICE },
      state: QuoteState.SELLER_DRAFT,
      isEditable: true,
    };
  });

  it('should create component', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('isEditable', () => {
    it('should allow seller edit for editable quote in state draft', () => {
      expect(classUnderTest.isEditable(quote)).toBe(true);
    });

    it('should allow seller edit for editable quote in state seller request', () => {
      quote.state = QuoteState.SELLER_REQUEST;
      expect(classUnderTest.isEditable(quote)).toBe(true);
    });

    it('should not allow seller edit for editable quote in state buyer draft', () => {
      quote.state = QuoteState.BUYER_DRAFT;
      expect(classUnderTest.isEditable(quote)).toBe(false);
    });

    it('should not allow seller edit for non-editable quote', () => {
      quote.isEditable = false;
      expect(classUnderTest.isEditable(quote)).toBe(false);
    });
  });

  describe('parseDiscountValue', () => {
    it('should parse string', (done) => {
      classUnderTest.parseDiscountValue('100.00').subscribe((result) => {
        expect(result).toBe(100);
        done();
      });
    });

    it('should consider locale specific decimal separator', (done) => {
      classUnderTest.parseDiscountValue('100.77').subscribe((result) => {
        expect(result).toBe(100.77);
        done();
      });
    });

    it('should ignore locale specific grouping separator', (done) => {
      classUnderTest.parseDiscountValue('1,000.77').subscribe((result) => {
        expect(result).toBe(1000.77);
        done();
      });
    });

    it('should handle undefined discount value by returning 0', (done) => {
      classUnderTest.parseDiscountValue(undefined).subscribe((result) => {
        expect(result).toBe(0);
        done();
      });
    });

    it('should handle null discount value by returning 0', (done) => {
      classUnderTest.parseDiscountValue(null).subscribe((result) => {
        expect(result).toBe(0);
        done();
      });
    });
  });

  describe('getFormatter', () => {
    it('should return a formatter for currency display ', (done) => {
      classUnderTest.getFormatter().subscribe((result) => {
        expect(result.format(0)).toBe('$0.00');
        done();
      });
    });
  });

  describe('checkAndReportCurrencyIfMissing', () => {
    it('should throw error in case we do not find symbol or currency ISO code', () => {
      expect(() =>
        classUnderTest['checkAndReportCurrencyIfMissing'](
          'en',
          new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'ALL',
            currencyDisplay: 'narrowSymbol',
          })
        )
      ).toThrowError();
    });
  });

  describe('addTimeToDate', () => {
    it('should add the local time to a given date', () => {
      const dateWithTime = classUnderTest.addTimeToDate(
        EXPIRATION_DATE_AS_STRING
      );
      expect(dateWithTime).toContain(EXPIRATION_DATE_AS_STRING);
      expect(dateWithTime).toContain('T');
      expect(dateWithTime).toContain(TimeUtils.getLocalTimezoneOffset());
    });
  });

  describe('removeTimeFromDate', () => {
    it('should remove the time part from a time stamp', () => {
      expect(classUnderTest.removeTimeFromDate(EXPIRATION_TIME_AS_STRING)).toBe(
        EXPIRATION_DATE_AS_STRING
      );
    });

    it('should do nothing for undefined time stamp', () => {
      expect(classUnderTest.removeTimeFromDate(undefined)).toBeUndefined();
    });
  });

  describe('performValidationAccordingToMetaData', () => {
    it('should accept input using group and decimal separators', () => {
      expect(
        classUnderTest['performValidationAccordingToMetaData'](
          '1.000,76',
          '.',
          ',',
          10
        )
      ).toBe(false);
    });
    it('should not accept input with 2 decimal separators', () => {
      expect(
        classUnderTest['performValidationAccordingToMetaData'](
          '1,000,76',
          '.',
          ',',
          10
        )
      ).toBe(true);
    });
  });

  describe('getMaximumNumberOfTotalPlaces', () => {
    it('should compile number of total places from total if no quote discount is present, taking 2 decimal points into account ', () => {
      expect(classUnderTest.getMaximumNumberOfTotalPlaces(quote)).toBe(
        TOTAL_PRICE.toFixed(0).length + 2
      );
    });

    it('should compile number of total places for numbers not being a power of ten', () => {
      const quote999: Quote = { ...quote, totalPrice: { value: 999 } };
      const quote100: Quote = { ...quote, totalPrice: { value: 100 } };
      expect(classUnderTest.getMaximumNumberOfTotalPlaces(quote999)).toBe(
        classUnderTest.getMaximumNumberOfTotalPlaces(quote100)
      );
      expect(classUnderTest.getMaximumNumberOfTotalPlaces(quote)).toBe(
        classUnderTest.getMaximumNumberOfTotalPlaces(quote999) + 1
      );
    });

    it('should compile number of total places from absolute discount if that exceeds total ', () => {
      quote.quoteDiscounts = { value: DISCOUNT_RATE };
      expect(classUnderTest.getMaximumNumberOfTotalPlaces(quote)).toBe(
        DISCOUNT_RATE.toFixed(0).length + 2
      );
    });

    it('should fall back to price value 1 if no values are available at all (will not happen in production) ', () => {
      quote.totalPrice.value = undefined;
      expect(classUnderTest.getMaximumNumberOfTotalPlaces(quote)).toBe(3);
    });
  });

  describe('getNumberFormatValidator', () => {
    const form: UntypedFormGroup = new UntypedFormGroup({
      discount: new UntypedFormControl(''),
    });

    it('should return a validator that allows proper input', () => {
      form.controls.discount.setValue('$10');
      expect(
        classUnderTest
          .getNumberFormatValidator('en', '$', 10)
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });

    it('should return a validator that blocks alphanumeric input', () => {
      form.controls.discount.setValue('A');
      expect(
        classUnderTest
          .getNumberFormatValidator('en', 'USD', 10)
          .apply({}, [form.controls.discount])
      ).toBeTruthy();
    });

    it('should return a validator that ignores undefined input', () => {
      form.controls.discount.setValue(undefined);
      expect(
        classUnderTest
          .getNumberFormatValidator('en', 'USD', 10)
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });
  });
});
