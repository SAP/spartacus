import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsService, Page } from '../../cms';
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

const mockRouterStateWithoutParams: RouterState = {
  navigationId: 0,
  state: {
    url: 'powertools-spa/en/USD/organization/purchase-limits',
    queryParams: {},
    params: {},
    context: {
      id: '/organization/purchase-limits',
      type: PageType.CONTENT_PAGE,
    },
    cmsRequired: true,
  },
};

const mockRouterStateWithParams: RouterState = {
  navigationId: 0,
  state: {
    url:
      'powertools-spa/en/USD/organization/unit/address/Rustic%20Retail/8796098887703',
    queryParams: {},
    params: { code: 'Rustic Retail', id: '8796098887703' },
    context: {
      id: '/organization/unit/address/Rustic Retail/8796098887703',
      type: PageType.CONTENT_PAGE,
    },
    cmsRequired: true,
  },
};

const mockEmptyRouterState: RouterState = {
  navigationId: 0,
  state: {
    url: '',
    queryParams: {},
    params: {},
    context: {
      id: '',
      type: PageType.CONTENT_PAGE,
    },
    cmsRequired: true,
  },
};

const state = new BehaviorSubject(null as RouterState);

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

  it('should return empty title with empty state', () => {
    state.next(mockEmptyRouterState);

    let titleWithoutState = '';
    resolver
      .resolveTitle()
      .subscribe((value) => (titleWithoutState = value))
      .unsubscribe();

    expect(titleWithoutState).toEqual('');
  });

  it('should resolve title without parameters', () => {
    state.next(mockRouterStateWithoutParams);

    let titleWithoutParams: string;
    resolver
      .resolveTitle()
      .subscribe((value) => (titleWithoutParams = value))
      .unsubscribe();

    expect(titleWithoutParams).toEqual('breadcrumbs.purchase-limits');
  });

  it('should resolve title with parameters', () => {
    state.next(mockRouterStateWithParams);

    let titleWithParameters = '';
    resolver
      .resolveTitle()
      .subscribe((value) => (titleWithParameters = value))
      .unsubscribe();

    expect(titleWithParameters).toEqual('8796098887703');
  });

  it('should resolve breadcrumbs without parameters', () => {
    state.next(mockRouterStateWithoutParams);

    let result: any[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'breadcrumbs.organization', link: '/organization' },
    ]);
  });

  it('should resolve breadcrumbs with parameters', () => {
    state.next(mockRouterStateWithParams);

    let result: any[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'breadcrumbs.organization', link: '/organization' },
      { label: 'breadcrumbs.unit', link: '/organization/unit' },
      { label: 'breadcrumbs.address', link: '/organization/unit/address' },
      {
        label: 'Rustic Retail',
        link: '/organization/unit/address/Rustic%20Retail',
      },
    ]);
  });
});
