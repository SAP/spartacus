import { TestBed } from '@angular/core/testing';
import { SiteContextUrlSerializer } from './site-context-url-serializer';
import { SiteContextParamsService } from '../facade/site-context-params.service';
import { UrlSegmentGroup, UrlTree } from '@angular/router';

describe('SiteContextUrlSerializer', () => {
  const mockSiteContextParamsService = {
    getContextParameters: () => ['language'],
    getParamValues: () => ['en', 'de']
  };

  let mockUrlTree: UrlTree;
  let service: SiteContextUrlSerializer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteContextUrlSerializer,
        {
          provide: SiteContextParamsService,
          useValue: mockSiteContextParamsService
        }
      ]
    });

    mockUrlTree = new UrlTree();
    Object.assign(mockUrlTree, {
      root: new UrlSegmentGroup([], {}),
      queryParams: {
        language: 'de'
      }
    });

    service = TestBed.get(SiteContextUrlSerializer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse url with site context parameters', () => {
    const urlTree = service.parse('en/another/part/of/url');
    const expected = { language: 'en' };
    expect(urlTree.queryParams).toEqual(expected);
  });

  it('should serialize url with site context parameters', () => {
    const url = service.serialize(mockUrlTree);
    expect(url).toEqual('de/');
  });

  describe('urlExtractContextParameters', () => {
    it('should extract context parameters from url', () => {
      const result = service.urlExtractContextParameters(
        'en/another/part/of/url'
      );
      const expected = {
        url: 'another/part/of/url',
        params: { language: 'en' }
      };

      expect(result).toEqual(expected);
    });
  });

  describe('urlTreeExtractContextParameters', () => {
    it('should extract context parameters from UrlTree', () => {
      const result = service.urlTreeExtractContextParameters(mockUrlTree);
      const expected = {
        language: 'de'
      };

      expect(result).toEqual(expected);
    });
  });
});
