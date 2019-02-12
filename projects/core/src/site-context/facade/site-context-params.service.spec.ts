import { TestBed } from '@angular/core/testing';

import { SiteContextParamsService } from './site-context-params.service';
import {
  contextServiceMapProvider,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  LanguageService,
  SiteContext,
  SiteContextConfig
} from '@spartacus/core';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('SiteContextParamsService', () => {
  const siteContextConfig: SiteContextConfig = {
    siteContext: {
      parameters: {
        [LANGUAGE_CONTEXT_ID]: {
          persistence: 'route',
          defaultValue: 'en',
          values: ['en', 'de', 'ja', 'zh']
        },
        [CURRENCY_CONTEXT_ID]: {
          persistence: 'route',
          defaultValue: 'USD',
          values: ['USD', 'JPY']
        },
        site: {
          persistence: 'session',
          defaultValue: 'electronics',
          values: ['electronics', 'apparel-de']
        }
      },
      urlEncodingParameters: [LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID]
    }
  };

  let mockLanguageService: SiteContext<any>;

  let service: SiteContextParamsService;

  beforeEach(() => {
    mockLanguageService = {
      getAll: () => of([]),
      getActive: createSpy().and.returnValue(of('de')),
      setActive: createSpy()
    };

    TestBed.configureTestingModule({
      providers: [
        contextServiceMapProvider,
        SiteContextParamsService,
        { provide: SiteContextConfig, useValue: siteContextConfig },
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    });

    service = TestBed.get(SiteContextParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getContextParameters', () => {
    it('should get all site context parameters', () => {
      const params = service.getContextParameters();
      expect(params).toEqual(['LANGUAGE', 'CURRENCY', 'site']);
    });
    it('should get context parameters by type', () => {
      const params = service.getContextParameters('route');
      expect(params).toEqual(['LANGUAGE', 'CURRENCY']);
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
});
