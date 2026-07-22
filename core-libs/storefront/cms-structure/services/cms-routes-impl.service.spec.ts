import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CmsRoute, PageType } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import { CmsComponentsService } from './cms-components.service';
import { CmsRoutesImplService } from './cms-routes-impl.service';
import { GuardsComposer } from './guards-composer';

describe('CmsRoutesImplService', () => {
  let service: CmsRoutesImplService;
  let cmsMappingService: CmsComponentsService;
  let mockRouter: Pick<Router, 'config' | 'navigateByUrl' | 'resetConfig'>;

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

  const mockCmsComponentsService = {
    getChildRoutes: () => ({ children: [{ path: 'sub-route' }] }),
  };

  beforeEach(() => {
    mockRouter = {
      config: mockRouterConfig,
      navigateByUrl: vi.fn(),
      resetConfig: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        { provide: CmsComponentsService, useValue: mockCmsComponentsService },
      ],
    });

    service = TestBed.inject(CmsRoutesImplService);
    cmsMappingService = TestBed.inject(CmsComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleCmsRoutesInGuard', () => {
    it('should return true if content route exists', () => {
      expect(
        service.handleCmsRoutesInGuard(
          mockPageContext,
          [],
          '/testRoute',
          '/testRoute'
        )
      ).toBeTruthy();
    });

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

    it('should include configured `data` property for cms driven route', () => {
      vi.spyOn(cmsMappingService, 'getChildRoutes').mockReturnValueOnce({
        parent: { data: { test: 'test data' } },
        children: [{ path: 'sub-route' }],
      });
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
            test: 'test data',
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
      vi.spyOn(cmsMappingService, 'getChildRoutes').mockReturnValue({});

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

    it('should wrap Cms Guard with a function', () => {
      const mockUrlTree = new UrlTree();

      const guardsComposer = TestBed.inject(GuardsComposer);
      vi.spyOn(guardsComposer, 'canActivate').mockReturnValue(of(mockUrlTree));

      const canActivateGuardFn = () => true;

      vi.spyOn(cmsMappingService, 'getChildRoutes').mockReturnValue({
        children: [{ path: 'test', canActivate: [canActivateGuardFn] }],
      });

      service.handleCmsRoutesInGuard(
        mockPageContext,
        [],
        '/testRoute2',
        '/testRoute2'
      );

      const newRouterConfig = (
        mockRouter.resetConfig as any
      ).mock.lastCall![0];
      const newChildCmsRoutes = newRouterConfig[0].children;
      const testGuardFn = newChildCmsRoutes[0].canActivate[0];
      expect(typeof testGuardFn).toBe('function');

      const mockActivatedRouteSnapshot = {
        url: [{ path: 'url' }],
      } as ActivatedRouteSnapshot;
      const mockRouterStateSnapshot = { url: 'url' } as RouterStateSnapshot;

      let guardResult;
      testGuardFn(
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      ).subscribe((result: any) => (guardResult = result));
      expect(guardResult).toBe(mockUrlTree);

      expect(guardsComposer.canActivate).toHaveBeenCalledWith(
        [{ canActivate: canActivateGuardFn }],
        mockActivatedRouteSnapshot,
        mockRouterStateSnapshot
      );
    });

    it('should wrap Cms Guards recursively with a function', () => {
      const guardsComposer = TestBed.inject(GuardsComposer);

      vi.spyOn(guardsComposer, 'canActivate').mockReturnValue(EMPTY);

      class TestGuard1 {}
      class TestGuard2 {}
      class TestGuard3 {}
      class TestGuard4 {}

      vi.spyOn(cmsMappingService, 'getChildRoutes').mockReturnValue({
        children: [
          {
            path: 'test1',
            canActivate: [TestGuard1],
            children: [
              {
                path: 'nested1',
                canActivate: [TestGuard3, TestGuard4],
              },
            ],
          },
          {
            path: 'test2',
            canActivate: [TestGuard2],
            children: [],
          },
        ],
      });

      service.handleCmsRoutesInGuard(
        mockPageContext,
        [],
        '/testRoute2',
        '/testRoute2'
      );

      const newRouterConfig = (
        mockRouter.resetConfig as any
      ).mock.lastCall![0];
      const newChildCmsRoutes = newRouterConfig[0].children;

      expect(newChildCmsRoutes).toEqual([
        {
          path: 'test1',
          canActivate: [expect.any(Function)],
          children: [
            {
              path: 'nested1',
              canActivate: [expect.any(Function), expect.any(Function)],
            },
          ],
        },
        {
          path: 'test2',
          canActivate: [expect.any(Function)],
          children: [],
        },
      ]);
      expect(newChildCmsRoutes[0].canActivate).not.toEqual([TestGuard1]);
      expect(newChildCmsRoutes[1].canActivate).not.toEqual([TestGuard2]);
      expect(newChildCmsRoutes[0].children[0].canActivate).not.toEqual([
        TestGuard3,
        TestGuard4,
      ]);
    });
  });
});
