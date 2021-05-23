import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LanguageService } from '../site-context';
import { I18nConfig } from './config/i18n-config';
import { CxNumericPipe } from './numeric.pipe';

const mockNumeric = '99999999';

describe('CxNumericPipe', () => {
  let numericPipe: CxNumericPipe;
  let languageService: LanguageService;

  beforeEach(() => {
    const mockLanguageService = {
      getActive: () => {},
    };

    TestBed.configureTestingModule({
      providers: [
        CxNumericPipe,
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: I18nConfig, useValue: { production: false } },
      ],
    });

    numericPipe = TestBed.inject(CxNumericPipe);
    languageService = TestBed.inject(LanguageService);
  });

  describe('transform', () => {
    it('should translate numeric for active language when it is "en"', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      expect(numericPipe.transform(mockNumeric)).toBe('99,999,999');
    });

    it('should translate numeric for active language other than "en", when locale is registered in Angular', () => {
      registerLocaleData(localeDe);
      spyOn(languageService, 'getActive').and.returnValue(of('de'));
      expect(numericPipe.transform(mockNumeric)).toBe('99.999.999');
    });

    it('should translate numeric for "en", when locale for active language is NOT registered in Angular', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('testLang'));
      expect(numericPipe.transform(mockNumeric)).toBe('99,999,999');
    });
  });
});
