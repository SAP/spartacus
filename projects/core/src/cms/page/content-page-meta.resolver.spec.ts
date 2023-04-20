import { TestBed } from '@angular/core/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { BasePageMetaResolver, CanonicalUrlOptions } from '..';
import { I18nTestingModule } from '../../i18n';
import { PageMetaService } from '../facade';
import { BreadcrumbMeta, PageRobotsMeta } from '../model/page.model';
import { ContentPageMetaResolver } from './content-page-meta.resolver';

class MockBasePageMetaResolver implements Partial<BasePageMetaResolver> {
  resolveCanonicalUrl(_options?: CanonicalUrlOptions): Observable<string> {
    return EMPTY;
  }
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[] | undefined> {
    return EMPTY;
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return EMPTY;
  }

  resolveTitle(): Observable<string> {
    return EMPTY;
  }

  resolveDescription(): Observable<string> {
    return EMPTY;
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

  it(`should resolve 'Page description' for resolveDescription()`, () => {
    let result: string | undefined;

    spyOn(basePageMetaResolver, 'resolveDescription').and.returnValue(
      of('Page description')
    );

    service
      .resolveDescription()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Page description');
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
