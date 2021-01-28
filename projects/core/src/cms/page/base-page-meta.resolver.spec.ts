import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BasePageMetaResolver, CmsService, Page } from '..';
import { I18nTestingModule, TranslationService } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { WindowRef } from '../../window/window-ref';
import { PageMetaService } from '../facade';
import { BreadcrumbMeta, PageRobotsMeta } from '../model/page.model';
import { PageMetaConfig } from './config/page-meta.config';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  title: 'Page title',
  slots: {},
  robots: [PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX],
};

class MockCmsService implements Partial<CmsService> {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key) {
    return of(key);
  }
}

class MockRoutingPageMetaResolver implements Partial<RoutingPageMetaResolver> {
  resolveBreadcrumbs() {
    return of([]);
  }
}
class MockWindowRef implements Partial<WindowRef> {
  document = {
    location: {
      href: 'http://storefront.com/page?query=abc&pageSize=10&page=1',
    },
  } as Document;
}

describe('BasePageMetaResolver', () => {
  let service: BasePageMetaResolver;
  let routingPageMetaResolver: RoutingPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: RoutingPageMetaResolver,
          useClass: MockRoutingPageMetaResolver,
        },
        {
          provide: PageMetaConfig,
          useValue: {
            pageMeta: {
              options: {
                canonicalUrl: {
                  forceHttps: true,
                  forceTrailingSlash: true,
                  forceWww: true,
                  removeQueryParams: true,
                },
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

    service = TestBed.inject(BasePageMetaResolver);
    routingPageMetaResolver = TestBed.inject(RoutingPageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should resolve 'Page title' for resolveTitle()`, () => {
    let result: string;

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Page title');
  });

  it('should resolve the home breadcrumb for resolveBreadcrumbs()', () => {
    let result: BreadcrumbMeta[];
    service
      .resolveBreadcrumbs()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();
    expect(result.length).toEqual(1);
    expect(result[0].label).toEqual('common.home');
    expect(result[0].link).toEqual('/');
  });

  it('should breadcrumbs for Angular child routes', () => {
    let result: BreadcrumbMeta[];

    spyOn(routingPageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
      of([{ label: 'child route breadcrumb', link: '/child' }])
    );
    service
      .resolveBreadcrumbs()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual({ label: 'common.home', link: '/' });
    expect(result[1]).toEqual({
      label: 'child route breadcrumb',
      link: '/child',
    });
  });

  it(`should resolve robots for page data`, () => {
    let result: PageRobotsMeta[];
    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toContain(PageRobotsMeta.FOLLOW);
    expect(result).toContain(PageRobotsMeta.INDEX);
  });

  // resolveCanonicalUrl
  describe('canonical Url', () => {
    it(`should resolve defaults`, () => {
      let result: string;
      service
        .resolveCanonicalUrl()
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toEqual('https://www.storefront.com/page/');
    });

    it(`should contain https`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ forceHttps: true })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toContain('https://');
    });

    it(`should stick to http`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ forceHttps: false })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toContain('http://');
    });

    it(`should add www`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ forceWww: true })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toContain('https://www.');
    });

    it(`should not add www`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ forceWww: false })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).not.toContain('www.');
    });

    it(`should add trailing slash`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({
          forceTrailingSlash: true,
          removeQueryParams: true,
        })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toContain('https://www.storefront.com/page/');
    });

    it(`should not add trailing slash`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({
          forceTrailingSlash: false,
          removeQueryParams: true,
        })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toEqual('https://www.storefront.com/page');
    });

    it(`should not add trailing slash after query parameters`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({
          forceTrailingSlash: true,
          removeQueryParams: false,
        })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toEqual(
        'https://www.storefront.com/page?query=abc&pageSize=10&page=1'
      );
    });

    it(`should remove all parameters`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ removeQueryParams: true })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toEqual('https://www.storefront.com/page/');
    });

    it(`should remove specific parameters`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ removeQueryParams: ['pageSize'] })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toEqual(
        'https://www.storefront.com/page?query=abc&page=1'
      );
    });

    it(`should keep all parameters`, () => {
      let result: string;
      service
        .resolveCanonicalUrl({ removeQueryParams: false })
        .subscribe((meta) => {
          result = meta;
        })
        .unsubscribe();
      expect(result).toEqual(
        'https://www.storefront.com/page?query=abc&pageSize=10&page=1'
      );
    });
  });
});
