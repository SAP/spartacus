import { TestBed } from '@angular/core/testing';
import {
  BreadcrumbMeta,
  CmsService,
  ContentPageMetaResolver,
  I18nTestingModule,
  Page,
  PageType,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
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
}

describe('OrganizationPageMetaResolver', () => {
  let resolver: OrganizationPageMetaResolver;
  let routingService: RoutingService;
  let contentPageMetaResolver: ContentPageMetaResolver;

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
      ],
    });

    resolver = TestBed.inject(OrganizationPageMetaResolver);
    routingService = TestBed.inject(RoutingService);
    contentPageMetaResolver = TestBed.inject(ContentPageMetaResolver);
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
          of({ state: { semanticRoute: 'budgetDetails' } } as any)
        );

        spyOn(contentPageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
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
});
