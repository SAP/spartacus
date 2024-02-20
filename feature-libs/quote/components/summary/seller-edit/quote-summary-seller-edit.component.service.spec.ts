import { TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';
import { LanguageService, TimeUtils } from '@spartacus/core';
import { Quote, QuoteState } from '@spartacus/quote/root';
import { Observable, of } from 'rxjs';
import {
  EXPIRATION_DATE_AS_STRING,
  EXPIRATION_TIME_AS_STRING,
  createEmptyQuote,
} from '../../../core/testing/quote-test-utils';
import { QuoteUIConfig } from '../../config/quote-ui.config';
import { QuoteSummarySellerEditComponentService } from './quote-summary-seller-edit.component.service';

const TOTAL_PRICE = 1000;

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en');
  }
}
const maximumDecimalsForPercentageDiscount = 10;

const quoteUIConfig: QuoteUIConfig = {
  quote: {
    maximumDecimalsForPercentageDiscount: maximumDecimalsForPercentageDiscount,
  },
};

describe('QuoteSummarySellerEditComponentService', () => {
  let classUnderTest: QuoteSummarySellerEditComponentService;
  let quote: Quote;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: QuoteUIConfig,
          useValue: quoteUIConfig,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    classUnderTest = TestBed.inject(QuoteSummarySellerEditComponentService);
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
    it('should return a formatter for percentage display ', (done) => {
      classUnderTest.getFormatter().subscribe((result) => {
        expect(result.format(0)).toBe('0%');
        done();
      });
    });
  });

  describe('checkAndReportPercentageSignIfMissing', () => {
    it('should throw error in case we do not pass percentage sign', () => {
      expect(() =>
        classUnderTest['checkAndReportMissingPercentageSign'](
          'en',
          new Intl.NumberFormat('en', {
            style: 'percent',
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

  describe('performValidationForPercentageValue', () => {
    it('should accept input according to group and decimal separators', () => {
      expect(
        classUnderTest['performValidationForPercentageValue'](
          '33,76%',
          '.',
          ','
        )
      ).toBe(false);
    });
    it('should accept input even if a grouping separator is present somewhere', () => {
      expect(
        classUnderTest['performValidationForPercentageValue'](
          '3.3,7.6%',
          '.',
          ','
        )
      ).toBe(false);
    });
    it('should not accept input with 2 decimal separators', () => {
      expect(
        classUnderTest['performValidationForPercentageValue'](
          '1,000,76',
          '.',
          ','
        )
      ).toBe(true);
    });
  });

  describe('getNumberFormatValidator', () => {
    const form: FormGroup = new FormGroup({
      discount: new FormControl<String>(''),
    });

    it('should return a validator that allows proper input', () => {
      form.controls.discount.setValue('$10');
      expect(
        classUnderTest
          .getNumberFormatValidator('en', '$')
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });

    it('should return a validator that blocks alphanumeric input', () => {
      form.controls.discount.setValue('A');
      expect(
        classUnderTest
          .getNumberFormatValidator('en', '%')
          .apply({}, [form.controls.discount])
      ).toBeTruthy();
    });

    it('should return a validator that ignores undefined input', () => {
      form.controls.discount.setValue(undefined);
      expect(
        classUnderTest
          .getNumberFormatValidator('en', '%')
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });
  });

  describe('retrieveMaxNumberOfDecimalPlaces', () => {
    it('should return the number of decimal places from configuration', () => {
      expect(classUnderTest['retrieveMaxNumberOfDecimalPlaces']()).toBe(
        maximumDecimalsForPercentageDiscount
      );
    });

    it('should return the number of decimal places as component default if configuration is not present', () => {
      quoteUIConfig.quote = undefined;
      expect(classUnderTest['retrieveMaxNumberOfDecimalPlaces']()).toBe(
        classUnderTest['maximumDecimalsForPercentageDiscountDefault']
      );
    });
  });
});
