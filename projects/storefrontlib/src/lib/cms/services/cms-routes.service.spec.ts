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
        cxCmsContext: { type: PageType.CONTENT_PAGE, id: '/testRoute' }
      }
    }
  ];

  const mockCmsMapping = {
    getRoutesFromPageData: () => [{ path: 'route1' }]
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

  describe('contentRouteExits', () => {
    it('should return true if content route exists', () => {
      expect(service.contentRouteExist('/testRoute')).toBeTruthy();
    });

    it('should return false if content route does not exist', () => {
      expect(service.contentRouteExist('/badRoute')).toBeFalsy();
    });
  });

  describe('handleContentRoutes', () => {
    it('should return false for proper content page', () => {
      let result;
      service
        .handleContentRoutes(mockPageContext, '/testRoute2')
        .subscribe(res => (result = res));

      expect(result).toEqual(false);
    });

    it('should add new route for proper content page', () => {
      service.handleContentRoutes(mockPageContext, '/testRoute2').subscribe();

      const expectedConfig = [
        {
          path: 'testRoute2',
          component: PageLayoutComponent,
          children: [{ path: 'route1' }],
          data: {
            cxCmsContext: mockPageContext
          }
        },
        ...mockRouterConfig
      ];

      expect(mockRouter.resetConfig).toHaveBeenCalledWith(expectedConfig);
    });

    it('should redirect for proper content page', () => {
      service.handleContentRoutes(mockPageContext, '/testRoute2').subscribe();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/testRoute2');
    });

    it('should return true for not generic content page', () => {
      const pageContext = {
        type: PageType.CONTENT_PAGE,
        id: 'testRote2'
      };

      let result;
      service
        .handleContentRoutes(pageContext, '/testRoute2')
        .subscribe(res => (result = res));

      expect(result).toEqual(true);
    });
  });
});
