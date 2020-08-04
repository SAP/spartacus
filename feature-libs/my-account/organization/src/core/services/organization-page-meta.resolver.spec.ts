import { TestBed } from '@angular/core/testing';
import {
  BreadcrumbMeta,
  CmsService,
  I18nTestingModule,
  Page,
  PageType,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OrganizationPageMetaResolver } from './organization-page-meta.resolver';

const mockOrganizationPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'CompanyPageTemplate',
  slots: {},
};

const state: RouterState = {
  navigationId: 0,
  state: {
    url: 'powertools-spa/en/USD/organization/cost-centers',
    queryParams: {},
    params: {},
    context: {
      id: '/organization/cost-centers',
      type: PageType.CONTENT_PAGE,
    },
    cmsRequired: true,
  },
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockOrganizationPage);
  }
}

class RoutingServiceStub {
  getRouterState(): Observable<RouterState> {
    return of(state);
  }
}

const testOrganizationUrl = '/test-organization';

class MockSemanticPathService implements Partial<SemanticPathService> {
  get = jasmine.createSpy('get').and.returnValue(testOrganizationUrl);
}

describe('OrganizationPageMetaResolver', () => {
  let resolver: OrganizationPageMetaResolver;
  let semanticPathService: SemanticPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        OrganizationPageMetaResolver,
      ],
    });

    resolver = TestBed.inject(OrganizationPageMetaResolver);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  it('should resolve breadcrumbs', () => {
    let result: BreadcrumbMeta[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'organization.breadcrumb', link: testOrganizationUrl },
    ]);
    expect(semanticPathService.get).toHaveBeenCalledWith('organization');
  });
});
