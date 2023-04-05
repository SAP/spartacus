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
import { firstValueFrom, Observable, of } from 'rxjs';
import { AccountSummaryPageMetaResolver } from './account-summary-page-meta.resolver';

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of({ state: {} } as RouterState);
  }
}

const testOrganizationUrl = '/organization';
const organizationTranslationKey = 'organization.breadcrumb';
const organizationBreadcrumb: BreadcrumbMeta = {
  label: organizationTranslationKey,
  link: testOrganizationUrl,
};
const accountSummariesBreadcrumb = {
  label: 'Account Summaries',
  link: '/organization',
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

describe('AccountSummaryPageMetaResolver', () => {
  let service: AccountSummaryPageMetaResolver;
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

    service = TestBed.inject(AccountSummaryPageMetaResolver);
    routingService = TestBed.inject(RoutingService);
    contentPageMetaResolver = TestBed.inject(ContentPageMetaResolver);
  });

  describe('resolveTitle', () => {
    it('should emit title of CMS content page ', async () => {
      expect(await firstValueFrom(service.resolveTitle())).toBe(
        'testContentPageTitle'
      );
    });
  });

  describe('resolveBreadcrumbs', () => {
    describe('when on the Account Summary units list page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'orgAccountSummary' } } as any)
        );
      });
      it('should NOT return breadcrumb for the Account Summary page', async () => {
        let val = await firstValueFrom(service.resolveBreadcrumbs());
        expect(val).toEqual([testHomeBreadcrumb, organizationBreadcrumb]);
      });
    });

    describe('when on details page of the Account Summary page', () => {
      const accountSummaryDetailsBreadcrumb: BreadcrumbMeta = {
        label: 'Account Summaries',
        link: '/organization/account-summary',
      };

      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'orgAccountSummaryDetails' } } as any)
        );

        spyOn(contentPageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
          of([testHomeBreadcrumb, accountSummaryDetailsBreadcrumb])
        );
      });

      it('should insert breadcrumb for the Account Summary page right after the Homepage breadcrumb', async () => {
        let val = await firstValueFrom(service.resolveBreadcrumbs());
        expect(val).toEqual([
          testHomeBreadcrumb,
          organizationBreadcrumb,
          accountSummariesBreadcrumb,
          accountSummaryDetailsBreadcrumb,
        ]);
      });
    });
  });
});
