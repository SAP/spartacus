import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  BasePageMetaResolver,
  CanonicalUrlOptions,
  CmsService,
  Page,
} from '..';
import { I18nTestingModule, TranslationService } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { PageMetaService } from '../facade';
import { BreadcrumbMeta, PageRobotsMeta } from '../model/page.model';
import { ContentPageMetaResolver } from './content-page-meta.resolver';
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
  translate(key: string) {
    return of(key);
  }
}

class MockRoutingPageMetaResolver implements Partial<RoutingPageMetaResolver> {
  resolveBreadcrumbs() {
    return of([]);
  }
}

class MockBasePageMetaResolver implements Partial<BasePageMetaResolver> {
  resolveCanonicalUrl(_options?: CanonicalUrlOptions): Observable<string> {
    return of();
  }
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return of();
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of();
  }

  resolveTitle(): Observable<string> {
    return of();
  }
}

describe('ContentPageMetaResolver', () => {
  let service: ContentPageMetaResolver;
  let basePageMetaResolver: BasePageMetaResolver;

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
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    service = TestBed.inject(ContentPageMetaResolver);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should resolve 'Page title' for resolveTitle()`, () => {
    let result: string | undefined;

    spyOn(basePageMetaResolver, 'resolveTitle').and.returnValue(
      of('Page title')
    );

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Page title');
  });

  it('should resolve the home breadcrumb for resolveBreadcrumbs()', () => {
    let result: BreadcrumbMeta[] | undefined;

    spyOn(basePageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
      of([{ label: 'common.home', link: '/' } as BreadcrumbMeta])
    );

    service
      .resolveBreadcrumbs()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();
    expect(result?.length).toEqual(1);
    expect(result?.[0].label).toEqual('common.home');
    expect(result?.[0].link).toEqual('/');
  });

  it('should breadcrumbs for Angular child routes', () => {
    let result: BreadcrumbMeta[] | undefined;

    spyOn(basePageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
      of([
        { label: 'common.home', link: '/' },
        { label: 'child route breadcrumb', link: '/child' },
      ] as BreadcrumbMeta[])
    );

    service
      .resolveBreadcrumbs()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();
    expect(result?.length).toEqual(2);
    expect(result?.[0]).toEqual({ label: 'common.home', link: '/' });
    expect(result?.[1]).toEqual({
      label: 'child route breadcrumb',
      link: '/child',
    });
  });

  it(`should resolve robots for page data`, () => {
    let result: PageRobotsMeta[] | undefined;

    spyOn(basePageMetaResolver, 'resolveRobots').and.returnValue(
      of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX] as PageRobotsMeta[])
    );

    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toContain(PageRobotsMeta.FOLLOW);
    expect(result).toContain(PageRobotsMeta.INDEX);
  });

  it('should resolve the canonical url', () => {
    let result: string | undefined;

    spyOn(basePageMetaResolver, 'resolveCanonicalUrl').and.returnValue(
      of('https://www.myshop.com/')
    );

    service
      .resolveCanonicalUrl()
      .subscribe((url) => {
        result = url;
      })
      .unsubscribe();
    expect(result).toEqual('https://www.myshop.com/');
  });
});
