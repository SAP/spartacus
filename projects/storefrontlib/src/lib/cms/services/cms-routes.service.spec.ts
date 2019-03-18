import { TestBed } from '@angular/core/testing';

import { CmsRoutesService } from './cms-routes.service';
import { Router } from '@angular/router';
import { CmsRoute, CmsService, PageType } from '@spartacus/core';
import { CmsMappingService, PageLayoutComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('CmsRoutesService', () => {
  let service: CmsRoutesService;
  let mockRouter;

  const mockPageContext = {
    type: PageType.CONTENT_PAGE,
    id: '/testRoute2'
  };

  const mockRouterConfig: CmsRoute[] = [
    { path: 'route1' },
    {
      path: 'testRoute',
      data: {
        cxCmsRouteContext: { type: PageType.CONTENT_PAGE, id: '/testRoute' }
      }
    }
  ];

  const mockCmsMapping = {
    getRoutesFromPageData: () => [{ path: 'sub-route' }]
  };

  beforeEach(() => {
    mockRouter = {
      config: mockRouterConfig,
      navigateByUrl: createSpy('router.navigateByUrl'),
      resetConfig: createSpy('router.resetConfig')
    };

    const mockCmsService = {
      getPageState: () => of({})
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: CmsService,
          useValue: mockCmsService
        },
        { provide: CmsMappingService, useValue: mockCmsMapping }
      ]
    });
    service = TestBed.get(CmsRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('cmsRouteExist', () => {
    it('should return true if content route exists', () => {
      expect(service.cmsRouteExist('/testRoute')).toBeTruthy();
    });

    it('should return false if content route does not exist', () => {
      expect(service.cmsRouteExist('/badRoute')).toBeFalsy();
    });
  });

  describe('handleCmsRoutesInGuard', () => {
    it('should return false for content page with cms driven route', () => {
      let result;
      service
        .handleCmsRoutesInGuard(mockPageContext, '/testRoute2')
        .subscribe(res => (result = res));

      expect(result).toEqual(false);
    });

    it('should add new route for content page with cms driven route', () => {
      service
        .handleCmsRoutesInGuard(mockPageContext, '/testRoute2')
        .subscribe();

      const expectedConfig = [
        {
          path: 'testRoute2',
          component: PageLayoutComponent,
          children: [{ path: 'sub-route' }],
          data: {
            cxCmsRouteContext: mockPageContext
          }
        },
        ...mockRouterConfig
      ];

      expect(mockRouter.resetConfig).toHaveBeenCalledWith(expectedConfig);
    });

    it('should redirect for content page with cms driven route', () => {
      service
        .handleCmsRoutesInGuard(mockPageContext, '/testRoute2')
        .subscribe();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/testRoute2');
    });

    it('should return true for content pages without cms driven route', () => {
      const pageContext = {
        type: PageType.CONTENT_PAGE,
        id: 'testRoute2'
      };

      let result;
      service
        .handleCmsRoutesInGuard(pageContext, '/testRoute2')
        .subscribe(res => (result = res));

      expect(result).toEqual(true);
    });
  });
});
