import { TestBed } from '@angular/core/testing';

import { SiteContextParamsService } from './site-context-params.service';
import {
  contextServiceMapProvider,
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
        language: {
          persistence: 'route',
          defaultValue: 'en',
          values: ['en', 'de', 'ja', 'zh']
        },
        currency: {
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
      urlEncodingParameters: ['language', 'currency']
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
      expect(params).toEqual(['language', 'currency', 'site']);
    });
    it('should get context parameters by type', () => {
      const params = service.getContextParameters('route');
      expect(params).toEqual(['language', 'currency']);
    });
  });

  it('getParamValues should return param values', () => {
    const values = service.getParamValues('currency');
    expect(values).toEqual(['USD', 'JPY']);
  });

  it('getParamDefaultValue should return default values', () => {
    const value = service.getParamDefaultValue('currency');
    expect(value).toEqual('USD');
  });

  it('getSiteContextService should return relevant service', () => {
    const ctxService = service.getSiteContextService('language');
    expect(ctxService).toEqual(mockLanguageService);
  });

  it('getValue should call corresponding service', () => {
    const value = service.getValue('language');
    expect(mockLanguageService.getActive).toHaveBeenCalled();
    expect(value).toEqual('de');
  });

  it('setValue should call corresponding service', () => {
    service.setValue('language', 'en');
    expect(mockLanguageService.setActive).toHaveBeenCalledWith('en');
  });
});
