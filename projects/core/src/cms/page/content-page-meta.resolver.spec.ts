import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsService, Page, PageMetaResolver } from '..';
import { I18nTestingModule, TranslationService } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { PageMetaService } from '../facade';
import { BreadcrumbMeta } from '../model/page.model';
import { ContentPageMetaResolver } from './content-page-meta.resolver';
import { RoutingPageMetaResolver } from './routing/routing-page-meta.resolver';

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  title: 'Page title',
  slots: {},
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

describe('ContentPageMetaResolver', () => {
  let service: ContentPageMetaResolver;
  let routingPageMetaResolver: RoutingPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        PageMetaService,
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: PageMetaResolver,
          useExisting: ContentPageMetaResolver,
          multi: true,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: RoutingPageMetaResolver,
          useClass: MockRoutingPageMetaResolver,
        },
      ],
    });

    service = TestBed.inject(ContentPageMetaResolver);
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
});
