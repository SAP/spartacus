import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CmsService, Page } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { OrganizationMetaResolver } from './organization-meta.resolver';

import { RoutingService } from '../../routing/facade/routing.service';
import { RouterState } from '../../routing/store/routing-state';
import { tap } from 'rxjs/operators';

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

const state = new BehaviorSubject(mockRouterStateWithoutParams);

class RoutingServiceStub {
  getRouterState(): Observable<RouterState> {
    return state;
  }
}

fdescribe('OrganizationMetaResolver', () => {
  let resolver: OrganizationMetaResolver;
  // let routingService: RoutingService;

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
    // routingService = TestBed.inject(RoutingService);
  });

  it('should resolve title without parameters', () => {
    // spyOn(routingService, 'getRouterState').and.returnValue(
    //   of(mockRouterStateWithoutParams)
    // );
    state.next(mockRouterStateWithoutParams);
    console.log('without parameters');

    let titleWithoutParams: string;
    resolver
      .resolveTitle()
      .pipe(tap(console.log))
      .subscribe((value) => (titleWithoutParams = value))
      .unsubscribe();

    expect(titleWithoutParams).toEqual('breadcrumbs.purchase-limits');
  });

  it('should resolve title with parameters', () => {
    // spyOn(routingService, 'getRouterState').and.returnValue(
    //   of(mockRouterStateWithParams)
    // );
    state.next(mockRouterStateWithParams);
    console.log('with parameters');
    let titleWithParameters = '';
    resolver
      .resolveTitle()
      .subscribe((value) => (titleWithParameters = value))
      .unsubscribe();

    expect(titleWithParameters).toEqual(['8796098887703']);
  });

  it('should resolve breadcrumbs without parameters', () => {
    // spyOn(routingService, 'getRouterState').and.returnValue(
    //   of(mockRouterStateWithoutParams)
    // );
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
    // spyOn(routingService, 'getRouterState').and.returnValue(
    //   of(mockRouterStateWithParams)
    // );
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
