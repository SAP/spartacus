import { TestBed } from '@angular/core/testing';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CmsService, Page, BreadcrumbMeta } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { OrganizationMetaResolver } from './organization-meta.resolver';

import { RoutingService } from '../../routing/facade/routing.service';
import { RouterState } from '../../routing/store/routing-state';

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

const mockRouterStateWithTranslatablePath: RouterState = {
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

const mockRouterStateWithoutTranslatablePath: RouterState = {
  navigationId: 0,
  state: {
    url: 'powertools-spa/en/USD/organization/cost-centers/Custom_Retail/edit',
    queryParams: {},
    params: {},
    context: {
      id: '/organization/cost-centers',
      type: PageType.CONTENT_PAGE,
    },
    cmsRequired: true,
  },
};

const state = new BehaviorSubject<RouterState>(null);

class RoutingServiceStub {
  getRouterState(): Observable<RouterState> {
    return state;
  }
}

describe('OrganizationMetaResolver', () => {
  let resolver: OrganizationMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        { provide: RoutingService, useClass: RoutingServiceStub },
        OrganizationMetaResolver,
      ],
    });

    resolver = TestBed.inject(OrganizationMetaResolver);
  });

  it('should resolve breadcrumbs with translation', () => {
    state.next(mockRouterStateWithTranslatablePath);

    let result: BreadcrumbMeta[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'organization', link: '/organization' },
    ]);
  });

  it('should resolve breadcrumbs without translation', () => {
    state.next(mockRouterStateWithoutTranslatablePath);

    let result: BreadcrumbMeta[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'organization', link: '/organization' },
      { label: 'cost-centers', link: '/organization/cost-centers' },
      {
        label: 'Custom_Retail',
        link: '/organization/cost-centers/Custom_Retail',
      },
    ]);
  });
});
