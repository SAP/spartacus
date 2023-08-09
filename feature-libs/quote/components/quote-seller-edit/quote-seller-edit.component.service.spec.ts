import { TestBed } from '@angular/core/testing';

import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';
import { CurrencyService, LanguageService, TimeUtils } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { QuoteState } from '@spartacus/quote/root';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  EXPIRATION_DATE_AS_STRING,
  EXPIRATION_TIME_AS_STRING,
} from '../../core/testing/quote-test-utils';

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
  });

  it('should create component', () => {
    expect(service).toBeDefined();
  });

  describe('isSeller', () => {
    it('should assign SELLER_DRAFT to seller role', () => {
      expect(service.isSeller(QuoteState.SELLER_DRAFT)).toBe(true);
    });

    it('should assign SELLER_REQUEST to seller role', () => {
      expect(service.isSeller(QuoteState.SELLER_REQUEST)).toBe(true);
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

  describe('getNumberFormatValidator', () => {
    const form: UntypedFormGroup = new UntypedFormGroup({
      discount: new UntypedFormControl(''),
    });

    it('should return a validator that allows proper input', () => {
      form.controls.discount.setValue('$10');
      expect(
        service
          .getNumberFormatValidator('en', '$')
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });

    it('should return a validator that blocks alphanumeric input', () => {
      form.controls.discount.setValue('A');
      expect(
        service
          .getNumberFormatValidator('en', 'USD')
          .apply({}, [form.controls.discount])
      ).toBeTruthy();
    });

    it('should return a validator that ignores undefined input', () => {
      form.controls.discount.setValue(undefined);
      expect(
        service
          .getNumberFormatValidator('en', 'USD')
          .apply({}, [form.controls.discount])
      ).toBeFalsy();
    });
  });
});
