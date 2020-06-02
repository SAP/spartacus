import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LanguageService } from '../site-context';
import { I18nConfig } from './config/i18n-config';
import { CxDecimalPipe } from './decimal.pipe';

const decimalUnformatted = '1234.12';
const decimalFormatted = '1,234.12';

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
    it('should translate decimal for active language when it is "en" and no digitsInfo provided', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      expect(pipe.transform(decimalUnformatted)).toBe(decimalFormatted);
    });

    it('should throw error if input is no number', () => {
      let failed;
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      try {
        pipe.transform('1234,234');
      } catch (e) {
        failed = e;
      }
      expect(failed).toBeDefined();
    });

    it('should translate decimal for active language when it is "en" and specific digitsInfo provided', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      expect(pipe.transform(decimalUnformatted, '1.3-3')).toBe('1,234.120');
    });

    it('should translate decimal for active language other than "en", when locale is registered in Angular', () => {
      registerLocaleData(localeDe);
      spyOn(languageService, 'getActive').and.returnValue(of('de'));
      expect(pipe.transform(decimalUnformatted)).toBe('1.234,12');
    });

    it('should translate decimal for "en", when locale for active language is NOT registered in Angular', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('testLang'));
      expect(pipe.transform(decimalUnformatted)).toBe(decimalFormatted);
    });
  });
});
