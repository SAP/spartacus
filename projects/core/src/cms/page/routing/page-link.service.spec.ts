import { TestBed } from '@angular/core/testing';
import { WindowRef } from '../../../window/window-ref';
import { PageMetaConfig } from '../config/page-meta.config';
import { PageLinkService } from './page-link.service';

class MockWindowRef implements Partial<WindowRef> {
  location = {
    href: 'http://storefront.com/search?query=foo&pageSize=10&page=1',
  };
}

describe('PageLinkService', () => {
  let service: PageLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PageMetaConfig,
          useValue: {
            pageMeta: {
              canonicalUrl: {
                forceHttps: true,
                forceTrailingSlash: true,
                forceWww: true,
                removeQueryParams: true,
              },
            },
          } as PageMetaConfig,
        },
        {
          provide: WindowRef,
          useClass: MockWindowRef,
        },
      ],
    });

    service = TestBed.inject(PageLinkService);
  });

  describe('canonical Url', () => {
    it(`should build canonical URL for window location`, () => {
      expect(service.getCanonicalUrl()).toEqual(
        'https://www.storefront.com/search/'
      );
    });

    it(`should build canonical URL for custom URL`, () => {
      expect(service.getCanonicalUrl({}, 'http://test.com/xyz')).toEqual(
        'https://www.test.com/xyz/'
      );
    });

    describe('forceWww', () => {
      it(`should add https`, () => {
        expect(
          service.getCanonicalUrl({ forceHttps: true }, 'http://test.com/xyz')
        ).toEqual('https://www.test.com/xyz/');
      });

      it(`should not add https`, () => {
        expect(
          service.getCanonicalUrl({ forceHttps: false }, 'http://test.com/xyz')
        ).toEqual('http://www.test.com/xyz/');
      });

      it(`should not replace www. in redirects`, () => {
        const canonical = service.getCanonicalUrl(
          { forceHttps: true, removeQueryParams: false, forceWww: false },
          'http://test.com/xyz?redirect=http://redirect.com'
        );
        expect(canonical).toContain('https://test.com');
        expect(canonical).toContain('http://redirect.com');
      });
    });

    describe('forceWww', () => {
      it(`should add www. subdomain`, () => {
        expect(
          service.getCanonicalUrl({ forceWww: true }, 'http://test.com/xyz')
        ).toContain('www.');
      });

      it(`should not add www. subdomain`, () => {
        expect(
          service.getCanonicalUrl({ forceWww: false }, 'http://test.com/xyz')
        ).not.toContain('www.');
      });

      it(`should not add www. subdomain to redirects`, () => {
        const canonical = service.getCanonicalUrl(
          { forceWww: true, removeQueryParams: false, forceHttps: false },
          'http://test.com/xyz?redirect=http://redirect.com'
        );
        expect(canonical).toContain('http://www.test.com');
        expect(canonical).toContain('http://redirect.com');
      });
    });

    describe('forceTrailingSlash', () => {
      it(`should add trailing slash`, () => {
        const canonical = service.getCanonicalUrl(
          {
            forceTrailingSlash: true,
          },
          'https://www.storefront.com?foo=bar'
        );
        expect(canonical).toEqual('https://www.storefront.com/');
      });

      it(`should not add trailing slash`, () => {
        const canonical = service.getCanonicalUrl(
          {
            forceTrailingSlash: true,
            removeQueryParams: false,
          },
          'https://www.storefront.com?foo=bar'
        );
        expect(canonical).toEqual('https://www.storefront.com?foo=bar');
      });

      it(`should not add trailing slash after leading question mark`, () => {
        const canonical = service.getCanonicalUrl(
          {
            forceTrailingSlash: true,
            removeQueryParams: false,
          },
          'https://www.storefront.com?'
        );
        expect(canonical).toEqual('https://www.storefront.com?');
      });

      it(`should add trailing slash when params are removed`, () => {
        const canonical = service.getCanonicalUrl(
          {
            forceTrailingSlash: true,
            removeQueryParams: true,
          },
          'https://www.storefront.com?foo=bar'
        );
        expect(canonical).toEqual('https://www.storefront.com/');
      });

      it(`should add trailing slash`, () => {
        const canonical = service.getCanonicalUrl(
          {
            forceTrailingSlash: true,
          },
          'https://www.storefront.com/page'
        );
        expect(canonical).toEqual('https://www.storefront.com/page/');
      });

      it(`should not add trailing slash`, () => {
        const canonical = service.getCanonicalUrl(
          {
            forceTrailingSlash: false,
          },
          'https://www.storefront.com'
        );
        expect(canonical).toEqual('https://www.storefront.com');
      });

      it(`should add trailing slash to redirects`, () => {
        const canonical = service.getCanonicalUrl(
          { forceWww: true, removeQueryParams: false, forceHttps: false },
          'http://test.com/xyz?redirect=http://redirect.com'
        );
        expect(canonical).toContain('http://redirect.com');
        expect(canonical).not.toContain('http://redirect.com/');
      });
    });

    describe('removeQueryParams', () => {
      it(`should remove parameters`, () => {
        const canonical = service.getCanonicalUrl(
          { removeQueryParams: true, forceTrailingSlash: false },
          'https://www.test.com/search?query=foo&pageSize=10&page=1'
        );
        expect(canonical).toEqual('https://www.test.com/search');
      });

      it(`should not remove parameters`, () => {
        const canonical = service.getCanonicalUrl(
          { removeQueryParams: false },
          'https://www.test.com/search?query=foo&pageSize=10&page=1'
        );
        expect(canonical).toEqual(
          'https://www.test.com/search?query=foo&pageSize=10&page=1'
        );
      });

      it(`should remove specific parameters`, () => {
        const canonical = service.getCanonicalUrl(
          { removeQueryParams: ['pageSize'] },
          'https://www.test.com/search?query=foo&pageSize=10&page=1'
        );
        expect(canonical).toEqual(
          'https://www.test.com/search?query=foo&page=1'
        );
      });
    });
  });
});
