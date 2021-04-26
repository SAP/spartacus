import { TestBed } from '@angular/core/testing';
import {
  BreadcrumbMeta,
  ContentPageMetaResolver,
  I18nTestingModule,
  PageRobotsMeta,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrganizationPageMetaResolver } from './organization-page-meta.resolver';

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of({ state: {} } as RouterState);
  }
}

const testOrganizationUrl = '/test-organization';
const organizationTranslationKey = 'organization.breadcrumb';
const organizationBreadcrumb: BreadcrumbMeta = {
  label: organizationTranslationKey,
  link: testOrganizationUrl,
};

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = jasmine.createSpy('get').and.returnValue(testOrganizationUrl);
}

const testHomeBreadcrumb: BreadcrumbMeta = { label: 'Test Home', link: '/' };

class MockContentPageMetaResolver implements Partial<ContentPageMetaResolver> {
  resolveTitle() {
    return of('testContentPageTitle');
  }

  resolveDescription(): Observable<string | undefined> {
    return of('Page description');
  }

  resolveBreadcrumbs() {
    return of([testHomeBreadcrumb]);
  }

  resolveRobots() {
    return of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX]);
  }
}

describe('OrganizationPageMetaResolver', () => {
  let service: OrganizationPageMetaResolver;
  let routingService: RoutingService;
  let contentPageMetaResolver: ContentPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        {
          provide: ContentPageMetaResolver,
          useClass: MockContentPageMetaResolver,
        },
      ],
    });

    service = TestBed.inject(OrganizationPageMetaResolver);
    routingService = TestBed.inject(RoutingService);
    contentPageMetaResolver = TestBed.inject(ContentPageMetaResolver);
  });

  describe('resolveTitle', () => {
    it('should emit title of CMS content page ', async () => {
      expect(await service.resolveTitle().pipe(take(1)).toPromise()).toBe(
        'testContentPageTitle'
      );
    });
  });

  describe('resolveBreadcrumbs', () => {
    describe('when being on the Organization page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'organization' } } as any)
        );
      });

      it('should NOT return breadcrumb for the Organization page', async () => {
        expect(
          await service.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([testHomeBreadcrumb]);
      });
    });

    describe('when being on any sub page of the Organization page', () => {
      const testBudgetsBreadcrumb: BreadcrumbMeta = {
        link: '/test-organization/test-budgets',
        label: 'Test Budgets',
      };

      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'orgBudgetDetails' } } as any)
        );

        spyOn(contentPageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
          of([testHomeBreadcrumb, testBudgetsBreadcrumb])
        );
      });

      it('should insert breadcrumb for the Organization page right after the Homepage breadcrumb', async () => {
        expect(
          await service.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([
          testHomeBreadcrumb,
          organizationBreadcrumb,
          testBudgetsBreadcrumb,
        ]);
      });
    });
  });

  it(`should resolve 'Page description' for resolveDescription()`, () => {
    let result: string | undefined;

    service
      .resolveDescription()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Page description');
  });

  it(`should resolve robots for page data`, () => {
    let result: PageRobotsMeta[] | undefined;

    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toContain(PageRobotsMeta.FOLLOW);
    expect(result).toContain(PageRobotsMeta.INDEX);
  });
});
