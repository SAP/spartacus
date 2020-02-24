import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CmsRoute, PageType } from '@spartacus/core';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import { CmsMappingService } from './cms-mapping.service';
import { CmsRoutesService } from './cms-routes.service';
import createSpy = jasmine.createSpy;

describe('CmsRoutesService', () => {
  let service: CmsRoutesService;
  let cmsMappingService: CmsMappingService;
  let mockRouter;

  const mockPageContext = {
    type: PageType.CONTENT_PAGE,
    id: '/testRoute2',
  };

  const mockRouterConfig: CmsRoute[] = [
    { path: 'route1' },
    {
      path: 'testRoute',
      data: {
        cxCmsRouteContext: { type: PageType.CONTENT_PAGE, id: '/testRoute' },
      },
    },
  ];

  const mockCmsMapping = {
    getRoutesForComponents: () => [{ path: 'sub-route' }],
  };

  beforeEach(() => {
    mockRouter = {
      config: mockRouterConfig,
      navigateByUrl: createSpy('router.navigateByUrl'),
      resetConfig: createSpy('router.resetConfig'),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        { provide: CmsMappingService, useValue: mockCmsMapping },
      ],
    });

    service = TestBed.inject(CmsRoutesService);
    cmsMappingService = TestBed.inject(CmsMappingService);
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
      expect(
        service.handleCmsRoutesInGuard(
          mockPageContext,
          [],
          '/testRoute2',
          '/testRoute2'
        )
      ).toEqual(false);
    });

    it('should add new route for content page with cms driven route', () => {
      service.handleCmsRoutesInGuard(
        mockPageContext,
        [],
        '/testRoute2',
        '/testRoute2'
      );

      const expectedConfig = [
        {
          path: 'testRoute2',
          component: PageLayoutComponent,
          children: [{ path: 'sub-route' }],
          data: {
            cxCmsRouteContext: {
              id: '/testRoute2',
              type: mockPageContext.type,
            },
          },
        },
        ...mockRouterConfig,
      ];
      expect(mockRouter.resetConfig).toHaveBeenCalledWith(expectedConfig);
    });

    it('should add new route for content page using page label, not current url', () => {
      service.handleCmsRoutesInGuard(
        mockPageContext,
        [],
        '/testRoute2/sub-route',
        '/testRoute2'
      );

      const expectedConfig = [
        {
          path: 'testRoute2',
          component: PageLayoutComponent,
          children: [{ path: 'sub-route' }],
          data: {
            cxCmsRouteContext: {
              id: '/testRoute2',
              type: mockPageContext.type,
            },
          },
        },
        ...mockRouterConfig,
      ];
      expect(mockRouter.resetConfig).toHaveBeenCalledWith(expectedConfig);
    });

    it('should redirect for content page with cms driven route', () => {
      service.handleCmsRoutesInGuard(
        mockPageContext,
        [],
        '/testRoute2',
        '/testRoute2'
      );
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/testRoute2');
    });

    it('should return true for content pages without cms driven route', () => {
      spyOn(cmsMappingService, 'getRoutesForComponents').and.returnValue([]);

      expect(
        service.handleCmsRoutesInGuard(
          mockPageContext,
          [],
          '/testRoute2',
          '/testRoute2'
        )
      ).toEqual(true);
    });

    it('should return true for non-content pages', () => {
      expect(
        service.handleCmsRoutesInGuard(
          { ...mockPageContext, type: PageType.PRODUCT_PAGE },
          [],
          '/testRoute2',
          '/testRoute2'
        )
      ).toEqual(true);
    });

    it('should return true for page label not starting with slash', () => {
      expect(
        service.handleCmsRoutesInGuard(
          mockPageContext,
          [],
          '/testRoute2',
          'testRoute2'
        )
      ).toEqual(true);
    });

    it('should return true for root path (slash)', () => {
      expect(
        service.handleCmsRoutesInGuard(
          { type: PageType.CONTENT_PAGE, id: 'testHomepage' },
          [],
          '/',
          '/'
        )
      ).toEqual(true);
    });
  });
});
