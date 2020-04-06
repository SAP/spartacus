import { TestBed } from '@angular/core/testing';
import { UrlSegmentGroup, UrlTree } from '@angular/router';
import { SiteContextParamsService } from './site-context-params.service';
import {
  SiteContextUrlSerializer,
  UrlTreeWithSiteContext,
} from './site-context-url-serializer';

describe('SiteContextUrlSerializer', () => {
  const mockSiteContextParamsService = {
    getUrlEncodingParameters: () => ['language', 'currency'],
    getParamValues: (param) =>
      ({ language: ['en', 'de'], currency: ['usd', 'pln'] }[param]),
    getValue: (param) => ({ language: 'de', currency: 'usd' }[param]),
  };

  let mockUrlTree: UrlTreeWithSiteContext;
  let service: SiteContextUrlSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteContextUrlSerializer,
        {
          provide: SiteContextParamsService,
          useValue: mockSiteContextParamsService,
        },
      ],
    });

    mockUrlTree = new UrlTree() as UrlTreeWithSiteContext;
    Object.assign(mockUrlTree, {
      root: new UrlSegmentGroup([], {}),
      queryParams: {},
      siteContext: {
        language: 'de',
        currency: 'pln',
      },
    });

    service = TestBed.inject(SiteContextUrlSerializer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse url with site context parameters', () => {
    const urlTree = service.parse('en/another/part/of/url');
    const expected = { language: 'en' };
    expect(urlTree.siteContext).toEqual(expected);
  });

  it('should serialize url with site context parameters', () => {
    const url = service.serialize(mockUrlTree);
    expect(url).toEqual('de/pln/');
  });

  it('should serialize url with partial site context parameters', () => {
    delete mockUrlTree.siteContext['currency'];
    const url = service.serialize(mockUrlTree);
    expect(url).toEqual('de/usd/');
  });

  describe('urlExtractContextParameters', () => {
    it('should extract context parameters from url', () => {
      const result = service.urlExtractContextParameters(
        'en/usd/another/part/of/url'
      );
      const expected = {
        url: 'another/part/of/url',
        params: { language: 'en', currency: 'usd' },
      };

      expect(result).toEqual(expected);
    });

    it('should extract partial context parameters', () => {
      const result = service.urlExtractContextParameters(
        'en/another/part/of/url'
      );
      const expected = {
        url: 'another/part/of/url',
        params: { language: 'en' },
      };

      expect(result).toEqual(expected);
    });

    it('should extract partial non consecutive context parameters', () => {
      const result = service.urlExtractContextParameters(
        '/usd/another/part/of/url'
      );
      const expected = {
        url: 'another/part/of/url',
        params: { currency: 'usd' },
      };

      expect(result).toEqual(expected);
    });

    it('should extract parameters when url contains query part', () => {
      const result = service.urlExtractContextParameters('en/usd?test=ala');
      const expected = {
        url: '?test=ala',
        params: { language: 'en', currency: 'usd' },
      };

      expect(result).toEqual(expected);
    });

    it('should extract parameters when url contains fragment part', () => {
      const result = service.urlExtractContextParameters('en/usd#fragment');
      const expected = {
        url: '#fragment',
        params: { language: 'en', currency: 'usd' },
      };

      expect(result).toEqual(expected);
    });

    it('should extract parameters when url contains query and fragment part', () => {
      const result = service.urlExtractContextParameters(
        'en/usd/?test=ala#fragment'
      );
      const expected = {
        url: '?test=ala#fragment',
        params: { language: 'en', currency: 'usd' },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('urlTreeExtractContextParameters', () => {
    it('should extract context parameters from UrlTree', () => {
      const result = service.urlTreeExtractContextParameters(mockUrlTree);
      const expected = {
        language: 'de',
        currency: 'pln',
      };

      expect(result).toEqual(expected);
    });
  });
});
