import { TestBed } from '@angular/core/testing';

import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';
import { CurrencyService, LanguageService, TimeUtils } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Quote, QuoteState } from '@spartacus/quote/root';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  EXPIRATION_DATE_AS_STRING,
  EXPIRATION_TIME_AS_STRING,
  createEmptyQuote,
} from '../../core/testing/quote-test-utils';

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

describe('QuoteSellerEditComponentService', () => {
  let service: QuoteSellerEditComponentService;
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
    service = TestBed.inject(QuoteSellerEditComponentService);
    quote = {
      ...createEmptyQuote(),
      totalPrice: { value: TOTAL_PRICE },
      state: QuoteState.SELLER_DRAFT,
      isEditable: true,
    };
  });

  it('should create component', () => {
    expect(service).toBeDefined();
  });

  describe('isEditableForSeller', () => {
    it('should allow seller edit for editable quote in state draft', () => {
      expect(service.isEditable(quote)).toBe(true);
    });

    it('should allow seller edit for editable quote in state seller request', () => {
      quote.state = QuoteState.SELLER_REQUEST;
      expect(service.isEditable(quote)).toBe(true);
    });

    it('should not allow seller edit for editable quote in state buyer draft', () => {
      quote.state = QuoteState.BUYER_DRAFT;
      expect(service.isEditable(quote)).toBe(false);
    });

    it('should not allow seller edit for non-editable quote', () => {
      quote.isEditable = false;
      expect(service.isEditable(quote)).toBe(false);
    });
  });

  describe('parseDiscountValue', () => {
    it('should parse string', (done) => {
      service.parseDiscountValue('100.00').subscribe((result) => {
        expect(result).toBe(100);
        done();
      });
    });

    it('should consider locale specific decimal separator', (done) => {
      service.parseDiscountValue('100.77').subscribe((result) => {
        expect(result).toBe(100.77);
        done();
      });
    });

    it('should ignore locale specific grouping separator', (done) => {
      service.parseDiscountValue('1,000.77').subscribe((result) => {
        expect(result).toBe(1000.77);
        done();
      });
    });
  });

  describe('getFormatter', () => {
    it('should return a formatter for currency display ', (done) => {
      service.getFormatter().subscribe((result) => {
        expect(result.format(0)).toBe('$0.00');
        done();
      });
    });
  });

  describe('checkAndReportCurrencyIfMissing', () => {
    it('should throw error in case we do not find symbol or currency ISO code', () => {
      expect(() =>
        service['checkAndReportCurrencyIfMissing'](
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
      const dateWithTime = service.addTimeToDate(EXPIRATION_DATE_AS_STRING);
      expect(dateWithTime).toContain(EXPIRATION_DATE_AS_STRING);
      expect(dateWithTime).toContain('T');
      expect(dateWithTime).toContain(TimeUtils.getLocalTimezoneOffset());
    });
  });

  describe('removeTimeFromDate', () => {
    it('should remove the time part from a time stamp', () => {
      expect(service.removeTimeFromDate(EXPIRATION_TIME_AS_STRING)).toBe(
        EXPIRATION_DATE_AS_STRING
      );
    });

    it('should do nothing for undefined time stamp', () => {
      expect(service.removeTimeFromDate(undefined)).toBeUndefined();
    });
  });

  describe('performValidationAccordingToMetaData', () => {
    it('should accept input using group and decimal separators', () => {
      expect(
        service['performValidationAccordingToMetaData'](
          '1.000,76',
          '.',
          ',',
          10
        )
      ).toBe(false);
    });
    it('should not accept input with 2 decimal separators', () => {
      expect(
        service['performValidationAccordingToMetaData'](
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
      expect(service.getMaximumNumberOfTotalPlaces(quote)).toBe(
        Math.log10(TOTAL_PRICE) + 3
      );
    });

    it('should compile number of total places for numbers not being a power of ten', () => {
      const quote999: Quote = { ...quote, totalPrice: { value: 999 } };
      const quote100: Quote = { ...quote, totalPrice: { value: 100 } };
      expect(service.getMaximumNumberOfTotalPlaces(quote999)).toBe(
        service.getMaximumNumberOfTotalPlaces(quote100)
      );
      expect(service.getMaximumNumberOfTotalPlaces(quote)).toBe(
        service.getMaximumNumberOfTotalPlaces(quote999) + 1
      );
    });

    it('should compile number of total places from absolute discount if that exceeds total ', () => {
      quote.quoteDiscounts = { value: DISCOUNT_RATE };
      expect(service.getMaximumNumberOfTotalPlaces(quote)).toBe(
        Math.log10(DISCOUNT_RATE) + 3
      );
    });

    it('should fall back to price value 1 if no values are available at all (will not happen in production) ', () => {
      quote.totalPrice.value = undefined;
      expect(service.getMaximumNumberOfTotalPlaces(quote)).toBe(3);
    });
  });

  describe('getNumberFormatValidator', () => {
    const form: UntypedFormGroup = new UntypedFormGroup({
      discount: new UntypedFormControl(''),
    });

    it('should return a validator that allows proper input', () => {
      form.controls.discount.setValue('$10');
      expect(
        service
          .getNumberFormatValidator('en', '$', 10)
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });

    it('should return a validator that blocks alphanumeric input', () => {
      form.controls.discount.setValue('A');
      expect(
        service
          .getNumberFormatValidator('en', 'USD', 10)
          .apply({}, [form.controls.discount])
      ).toBeTruthy();
    });

    it('should return a validator that ignores undefined input', () => {
      form.controls.discount.setValue(undefined);
      expect(
        service
          .getNumberFormatValidator('en', 'USD', 10)
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });
  });
});
