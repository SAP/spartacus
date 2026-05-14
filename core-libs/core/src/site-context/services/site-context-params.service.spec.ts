import { TestBed } from '@angular/core/testing';
import {
  contextServiceMapProvider,
  LanguageService,
  SiteContext,
  SiteContextConfig,
} from '@spartacus/core';
import { of } from 'rxjs';
import { bufferCount, take } from 'rxjs/operators';
import { CurrencyService } from '../facade';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../providers/context-ids';
import { SiteContextParamsService } from './site-context-params.service';
import createSpy = jasmine.createSpy;

describe('SiteContextParamsService', () => {
  const siteContextConfig: SiteContextConfig = {
    context: {
      [LANGUAGE_CONTEXT_ID]: ['en', 'de', 'ja', 'zh'],
      [CURRENCY_CONTEXT_ID]: ['USD', 'JPY'],
      [BASE_SITE_CONTEXT_ID]: ['electronics', 'apparel-de'],
      urlParameters: [LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID],
    },
  };

  let mockLanguageService: SiteContext<any>;
  let mockCurrencyService: SiteContext<any>;

  let service: SiteContextParamsService;

  beforeEach(() => {
    mockLanguageService = {
      getAll: () => of([]),
      getActive: createSpy().and.returnValue(of('de')),
      setActive: createSpy(),
    };

    mockCurrencyService = {
      getAll: () => of([]),
      setActive: createSpy(),
      getActive: createSpy().and.returnValue(of('')),
    };

    TestBed.configureTestingModule({
      providers: [
        contextServiceMapProvider,
        SiteContextParamsService,
        { provide: SiteContextConfig, useValue: siteContextConfig },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: CurrencyService, useValue: mockCurrencyService },
      ],
    });

    service = TestBed.inject(SiteContextParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getContextParameters', () => {
    it('should get all site context parameters', () => {
      const params = service.getContextParameters();
      expect(params).toEqual(['language', 'currency', 'baseSite']);
    });
  });

  it('getParamValues should return param values', () => {
    const values = service.getParamValues(CURRENCY_CONTEXT_ID);
    expect(values).toEqual(['USD', 'JPY']);
  });

  it('getParamDefaultValue should return default values', () => {
    const value = service.getParamDefaultValue(CURRENCY_CONTEXT_ID);
    expect(value).toEqual('USD');
  });

  describe('getSiteContextService', () => {
    it('should return relevant service', () => {
      const ctxService = service.getSiteContextService(LANGUAGE_CONTEXT_ID);
      expect(ctxService).toEqual(mockLanguageService);
    });

    it('should return undefined if there is no such parameter', () => {
      const ctxService = service.getSiteContextService('custom');
      expect(ctxService).toEqual(undefined);
    });
  });

  it('getValue should call corresponding service', () => {
    const value = service.getValue(LANGUAGE_CONTEXT_ID);
    expect(mockLanguageService.getActive).toHaveBeenCalled();
    expect(value).toEqual('de');
  });

  it('setValue should call corresponding service', () => {
    service.setValue(LANGUAGE_CONTEXT_ID, 'en');
    expect(mockLanguageService.setActive).toHaveBeenCalledWith('en');
  });

  describe('getValues', () => {
    afterAll(() => {
      // set to initial mock values
      mockLanguageService.getActive = createSpy().and.returnValue(of('de'));
      mockCurrencyService.getActive = createSpy().and.returnValue(of(''));
    });

    it('should emit empty array for empty context', () => {
      service
        .getValues([])
        .pipe(take(1))
        .subscribe((value) => expect(value).toEqual([]));
    });

    it('should emit active values for single service', () => {
      mockLanguageService.getActive = createSpy().and.returnValue(
        of('en', 'de', 'en')
      );
      service
        .getValues([LANGUAGE_CONTEXT_ID])
        .pipe(bufferCount(3), take(1))
        .subscribe((values) => {
          expect(values).toEqual([['en'], ['de'], ['en']]);
        });
    });

    it('should emit active values for multiple services', () => {
      mockLanguageService.getActive = createSpy().and.returnValue(of('ja'));
      mockCurrencyService.getActive = createSpy().and.returnValue(
        of('', 'USD', 'JPY', 'USD')
      );
      service
        .getValues([LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID])
        .pipe(bufferCount(3), take(1))
        .subscribe((values) => {
          expect(values).toEqual([
            ['ja', 'USD'],
            ['ja', 'JPY'],
            ['ja', 'USD'],
          ]);
        });
    });
  });
});
