import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LanguageService } from '../site-context';
import { I18nConfig } from './config/i18n-config';
import { CxDecimalPipe } from './decimal.pipe';

const numericValue = 9999.99;
const digitsInfo = '1.3-3';

describe('DecimalPipe', () => {
  let pipe: CxDecimalPipe;
  let languageService: LanguageService;

  beforeEach(() => {
    const mockLanguageService = {
      getActive: () => {},
    };

    TestBed.configureTestingModule({
      providers: [
        CxDecimalPipe,
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: I18nConfig, useValue: { production: false } },
      ],
    });

    pipe = TestBed.inject(CxDecimalPipe);
    languageService = TestBed.inject(LanguageService);
  });

  describe('transform', () => {
    it('should translate decimal for active language when it is "en"', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      expect(pipe.transform(numericValue, digitsInfo)).toBe('9,999.990');
    });

    it('should translate decimal with 2 decimal places if no digitsInfo is given', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      expect(pipe.transform(numericValue)).toBe('9,999.99');
    });

    it('should translate decimal for active language other than "en", when locale is registered in Angular', () => {
      registerLocaleData(localeDe);
      spyOn(languageService, 'getActive').and.returnValue(of('de'));
      expect(pipe.transform(numericValue, digitsInfo)).toBe('9.999,990');
    });

    it('should translate decimal for "en", when locale for active language is NOT registered in Angular', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('testLang'));
      expect(pipe.transform(numericValue, digitsInfo)).toBe('9,999.990');
    });
  });
});
