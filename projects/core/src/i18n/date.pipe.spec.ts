import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DatePipe } from './date.pipe';
import { LanguageService } from '../site-context';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { I18nConfig } from './config/i18n-config';

const mockDate = '2017-01-11T10:14:39+0000';
const mockDateFormat = 'longDate';

describe('DatePipe', () => {
  let pipe: DatePipe;
  let languageService: LanguageService;

  beforeEach(() => {
    const mockLanguageService = {
      getActive: () => {},
    };

    TestBed.configureTestingModule({
      providers: [
        DatePipe,
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: I18nConfig, useValue: { production: false } },
      ],
    });

    pipe = TestBed.get(DatePipe);
    languageService = TestBed.get(LanguageService);
  });

  describe('transform', () => {
    it('should translate date for active language when it is "en"', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('en'));
      expect(pipe.transform(mockDate, mockDateFormat)).toBe('January 11, 2017');
    });

    it('should translate date for active language other than "en", when locale is registered in Angular', () => {
      registerLocaleData(localeDe);
      spyOn(languageService, 'getActive').and.returnValue(of('de'));
      expect(pipe.transform(mockDate, mockDateFormat)).toBe('11. Januar 2017');
    });

    it('should translate date for "en", when locale for active language is NOT registered in Angular', () => {
      spyOn(languageService, 'getActive').and.returnValue(of('testLang'));
      expect(pipe.transform(mockDate, mockDateFormat)).toBe('January 11, 2017');
    });
  });
});
