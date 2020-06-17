import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsService, Page } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { OrganizationMetaResolver } from './organization-meta.resolver';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../routing/facade/routing.service';

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
  getRouterState(): Observable<any> {
    return of({
      state: {
        url: 'powertools-spa/en/USD/organization/purchase-limits',
        queryParams: {},
        params: {},
        context: { id: '/organization/purchase-limits', type: 'ContentPage' },
        cmsRequired: true,
      },
    });
  }
}

fdescribe('OrganizationMetaResolver', () => {
  let resolver: OrganizationMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: CmsService, useClass: MockCmsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [],
              params: {},
              queryParams: {},
              fragment: null,
              data: {},
              outlet: 'primary',
              component: null,
              routeConfig: null,
              root: null,
              parent: null,
              firstChild: null,
              children: [
                {
                  url: [
                    {
                      path: 'organization',
                      parameters: {},
                      parameterMap: null,
                    },
                    {
                      path: 'purchase-limits',
                      parameters: {},
                      parameterMap: null,
                    },
                  ],
                  params: {},
                  queryParams: {},
                  fragment: null,
                  data: {},
                  outlet: 'primary',
                  component: null,
                  routeConfig: null,
                  root: null,
                  parent: null,
                  firstChild: null,
                  children: null,
                  pathFromRoot: null,
                  paramMap: null,
                  queryParamMap: null,
                },
              ],
              pathFromRoot: null,
              paramMap: null,
              queryParamMap: null,
            },
          },
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    resolver = TestBed.inject(OrganizationMetaResolver);
  });

  it('should resolve title', () => {
    let result: string;
    resolver
      .resolveTitle()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual('breadcrumbs.purchase-limits');
  });

  it('should resolve breadcrumbs', () => {
    let result: any[];
    resolver
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([
      { label: 'common.home', link: '/' },
      { label: 'pageMetaResolver.organization.home', link: '/organization' },
    ]);
  });
});
