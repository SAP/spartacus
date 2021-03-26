import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../providers/context-ids';
import { CurrencyService } from './currency.service';
import { LanguageService } from './language.service';
import { SiteContextPersistenceService } from './site-context-persistence.service';

class MockLanguageService implements Partial<LanguageService> {
  getActive = () => of('');
  setActive = () => {};
}

class MockCurrencyService implements Partial<CurrencyService> {
  getActive = () => of('');
  setActive = () => {};
}

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    [LANGUAGE_CONTEXT_ID]: ['en', 'de'],
    [CURRENCY_CONTEXT_ID]: ['USD', 'EUR'],
  },
};

describe('SiteContextPersistenceService', () => {
  let service: SiteContextPersistenceService;
  let persistenceService: StatePersistenceService;
  let languageService: LanguageService;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteContextPersistenceService,
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: CurrencyService,
          useClass: MockCurrencyService,
        },
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(SiteContextPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    languageService = TestBed.inject(LanguageService);
    currencyService = TestBed.inject(CurrencyService);
    spyOn(persistenceService, 'syncWithStorage').and.stub();
    spyOn(languageService, 'setActive').and.stub();
    spyOn(currencyService, 'setActive').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('initLanguageSync', () => {
    it('should call persistenceService with the correct attributes', () => {
      const state$ = of('zh');
      spyOn(languageService, 'getActive').and.returnValue(state$);

      service['initLanguageSync']();

      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: 'language',
          state$,
        })
      );
      expect(languageService.getActive).toHaveBeenCalled();
    });
  });

  describe('initCurrencySync', () => {
    it('should call persistenceService with the correct attributes', () => {
      const state$ = of('JPY');
      spyOn(currencyService, 'getActive').and.returnValue(state$);

      service['initCurrencySync']();

      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: 'currency',
          state$,
        })
      );
      expect(currencyService.getActive).toHaveBeenCalled();
    });
  });

  describe('onReadLanguage', () => {
    it('should set language as active if the language is contained in the SiteContextConfig', () => {
      const languageState = 'de';
      service['onReadLanguage'](languageState);

      expect(languageService.setActive).toHaveBeenCalledWith(languageState);
    });
    it('should NOT set language as active if the language NOT is contained in the SiteContextConfig', () => {
      const languageState = 'zh';
      service['onReadLanguage'](languageState);

      expect(languageService.setActive).not.toHaveBeenCalledWith(languageState);

      // Fallback to default
      expect(languageService.setActive).toHaveBeenCalledWith('en');
    });
    it('should set DEFAULT CONFIG language if no language is stored', () => {
      service['onReadLanguage'](null as any);

      // Fallback to default
      expect(languageService.setActive).toHaveBeenCalledWith('en');
    });
  });

  describe('onReadCurrency', () => {
    it('should set currency as active if the currency is contained in the SiteContextConfig', () => {
      const currencyState = 'EUR';
      service['onReadCurrency'](currencyState);

      expect(currencyService.setActive).toHaveBeenCalledWith(currencyState);
    });
    it('should NOT set currency as active if the currency NOT is contained in the SiteContextConfig', () => {
      const currencyState = 'CAD';
      service['onReadCurrency'](currencyState);

      expect(currencyService.setActive).not.toHaveBeenCalledWith(currencyState);

      // Fallback to default
      expect(currencyService.setActive).toHaveBeenCalledWith('USD');
    });
    it('should set DEFAULT CONFIG currency if no currency is stored', () => {
      service['onReadCurrency'](null as any);

      // Fallback to default
      expect(currencyService.setActive).toHaveBeenCalledWith('USD');
    });
  });
});
