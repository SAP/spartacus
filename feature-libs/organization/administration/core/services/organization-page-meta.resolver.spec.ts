import { TestBed } from '@angular/core/testing';
import {
  BreadcrumbMeta,
  CmsService,
  ContentPageMetaResolver,
  I18nTestingModule,
  Page,
  PageRobotsMeta,
  PageType,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { BasePageMetaResolver } from 'projects/core/src/cms/page/base-page-meta.resolver';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrganizationPageMetaResolver } from './organization-page-meta.resolver';

const mockOrganizationPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'CompanyPageTemplate',
  slots: {},
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockOrganizationPage);
  }
}

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

  resolveBreadcrumbs() {
    return of([testHomeBreadcrumb]);
  }

  resolveRobots() {
    return of([]);
  }
}

class MockBasePageMetaResolver {
  resolveTitle() {
    return of('testContentPageTitle');
  }
  resolveBreadcrumbs() {
    return of([testHomeBreadcrumb]);
  }
  resolveRobots() {
    return of([]);
  }
}

describe('OrganizationPageMetaResolver', () => {
  let resolver: OrganizationPageMetaResolver;
  let routingService: RoutingService;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        {
          provide: ContentPageMetaResolver,
          useClass: MockContentPageMetaResolver,
        },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    resolver = TestBed.inject(OrganizationPageMetaResolver);
    routingService = TestBed.inject(RoutingService);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
  });

  describe('resolveTitle', () => {
    it('should emit title of CMS content page ', async () => {
      expect(await resolver.resolveTitle().pipe(take(1)).toPromise()).toBe(
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
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
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

        spyOn(basePageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
          of([testHomeBreadcrumb, testBudgetsBreadcrumb])
        );
      });

      it('should insert breadcrumb for the Organization page right after the Homepage breadcrumb', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([
          testHomeBreadcrumb,
          organizationBreadcrumb,
          testBudgetsBreadcrumb,
        ]);
      });
    });
  });

  describe('resolveRobots', () => {
    it('should resolve title from the BasePageMetaResolver', async () => {
      spyOn(basePageMetaResolver, 'resolveRobots').and.returnValue(
        of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX])
      );
      let result;
      resolver
        .resolveRobots()
        .subscribe((robots) => (result = robots))
        .unsubscribe();
      expect(result).toContain(PageRobotsMeta.FOLLOW);
      expect(result).toContain(PageRobotsMeta.INDEX);
    });
  });
});
