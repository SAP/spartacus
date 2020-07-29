import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BreadcrumbMeta, CmsService, Page } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { RouterState } from '../../routing/store/routing-state';
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

describe('OrganizationPageMetaResolver', () => {
  let resolver: OrganizationPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: RoutingServiceStub },
        OrganizationPageMetaResolver,
      ],
    });

    resolver = TestBed.inject(OrganizationPageMetaResolver);
  });

  it('should resolve breadcrumbs', () => {
    let result: BreadcrumbMeta[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'organization.breadcrumb', link: '/organization' },
    ]);
  });
});
