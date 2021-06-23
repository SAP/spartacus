import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoutesService } from '../../../routing/services/activated-routes.service';
import { DefaultRoutePageMetaResolver } from './default-route-page-meta.resolver';
import { ActivatedRouteSnapshotWithPageMeta } from './route-page-meta.model';
import { RoutingPageMetaResolver } from './routing-page-meta.resolver';

@Injectable({ providedIn: 'root' })
class ResolverA {}

@Injectable({ providedIn: 'root' })
class ResolverB {}

@Injectable({ providedIn: 'root' })
class ResolverC {}

@Injectable()
class MockDefaultRoutePageMetaResolver
  implements Partial<DefaultRoutePageMetaResolver>
{
  resolveBreadcrumbs() {
    return of([]);
  }
}

describe('RoutingPageMetaResolver', () => {
  let resolver: RoutingPageMetaResolver;
  let mockActivatedRoutes$: BehaviorSubject<
    ActivatedRouteSnapshotWithPageMeta[]
  >;

  beforeEach(() => {
    mockActivatedRoutes$ = new BehaviorSubject([]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoutesService,
          useValue: {
            routes$: mockActivatedRoutes$,
          } as Partial<ActivatedRoutesService>,
        },
        {
          provide: DefaultRoutePageMetaResolver,
          useClass: MockDefaultRoutePageMetaResolver,
        },
      ],
    });

    resolver = TestBed.inject(RoutingPageMetaResolver);
  });

  describe('routes$', () => {
    it('should emit activated routes, but not the special root route', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        { url: [{ path: 'parent' }] },
        { url: [{ path: 'child' }] },
      ] as ActivatedRouteSnapshot[]);

      const result = await resolver['routes$'].pipe(take(1)).toPromise();
      expect(result).toEqual([
        { url: [{ path: 'parent' }] },
        { url: [{ path: 'child' }] },
      ] as ActivatedRouteSnapshotWithPageMeta[]);
    });
  });

  describe('routesWithExtras$', () => {
    it('should emit routes', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        { url: [{ path: 'parent' }] },
        { url: [{ path: 'child' }] },
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      const result = await resolver['routesWithExtras$']
        .pipe(take(1))
        .toPromise();
      expect(result).toEqual([
        jasmine.objectContaining({ route: { url: [{ path: 'parent' }] } }),
        jasmine.objectContaining({ route: { url: [{ path: 'child' }] } }),
      ]);
    });

    it('should emit precalculated URLs for routes', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        { url: [{ path: 'grandparent' }] },
        { url: [{ path: 'test' }, { path: 'parent' }] },
        { url: [{ path: 'child' }] },
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      const result = await resolver['routesWithExtras$']
        .pipe(take(1))
        .toPromise();
      expect(result).toEqual([
        jasmine.objectContaining({ url: '/grandparent' }),
        jasmine.objectContaining({ url: '/grandparent/test/parent' }),
        jasmine.objectContaining({ url: '/grandparent/test/parent/child' }),
      ]);
    });

    it('should emit precalculated resolver instances', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        {
          url: [{ path: 'grandparent' }],
          routeConfig: { data: { cxPageMeta: { resolver: ResolverA } } },
        },
        {
          url: [{ path: 'parent' }],
          routeConfig: { data: { cxPageMeta: { resolver: ResolverB } } },
        },
        {
          url: [{ path: 'child' }],
          routeConfig: { data: { cxPageMeta: { resolver: ResolverC } } },
        },
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      const resolverInstanceA = TestBed.inject(ResolverA);
      const resolverInstanceB = TestBed.inject(ResolverB);
      const resolverInstanceC = TestBed.inject(ResolverC);

      const result = await resolver['routesWithExtras$']
        .pipe(take(1))
        .toPromise();

      expect(result).toEqual([
        jasmine.objectContaining({ resolver: resolverInstanceA }),
        jasmine.objectContaining({ resolver: resolverInstanceB }),
        jasmine.objectContaining({ resolver: resolverInstanceC }),
      ]);
    });

    it('should emit inherited resolver instances', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        {
          url: [{ path: 'grandparent' }],
          routeConfig: { data: { cxPageMeta: { resolver: ResolverA } } },
        },
        {
          url: [{ path: 'parent' }],
        },
        {
          url: [{ path: 'child' }],
          routeConfig: { data: { cxPageMeta: { resolver: ResolverC } } },
        },
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      const resolverInstanceA = TestBed.inject(ResolverA);
      const resolverInstanceC = TestBed.inject(ResolverC);

      const result = await resolver['routesWithExtras$']
        .pipe(take(1))
        .toPromise();

      expect(result).toEqual([
        jasmine.objectContaining({ resolver: resolverInstanceA }),
        jasmine.objectContaining({ resolver: resolverInstanceA }),
        jasmine.objectContaining({ resolver: resolverInstanceC }),
      ]);
    });

    it('should emit default resolver instance as a fallback', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        { url: [{ path: 'grandparent' }] },
        { url: [{ path: 'parent' }] },
        {
          url: [{ path: 'child' }],
          routeConfig: { data: { cxPageMeta: { resolver: ResolverC } } },
        },
      ] as ActivatedRouteSnapshotWithPageMeta[]);
      const resolverInstanceC = TestBed.inject(ResolverC);
      const defaultResolverInstance = TestBed.inject(
        DefaultRoutePageMetaResolver
      );

      const result = await resolver['routesWithExtras$']
        .pipe(take(1))
        .toPromise();

      expect(result).toEqual([
        jasmine.objectContaining({ resolver: defaultResolverInstance }),
        jasmine.objectContaining({ resolver: defaultResolverInstance }),
        jasmine.objectContaining({ resolver: resolverInstanceC }),
      ]);
    });
  });

  describe('resolveBreadcrumbs', () => {
    let defaultResolver: DefaultRoutePageMetaResolver;

    beforeEach(() => {
      defaultResolver = TestBed.inject(DefaultRoutePageMetaResolver);
      spyOn(defaultResolver, 'resolveBreadcrumbs').and.callFake(
        ({ url, pageMetaConfig }) =>
          pageMetaConfig?.breadcrumb
            ? of([{ link: url, label: pageMetaConfig?.breadcrumb as string }])
            : of([])
      );
    });

    it('should return empty breadcrumb when given no routes', async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      const result = await resolver
        .resolveBreadcrumbs()
        .pipe(take(1))
        .toPromise();
      expect(result).toEqual([]);
      expect(defaultResolver.resolveBreadcrumbs).not.toHaveBeenCalled();
    });

    it(`should NOT return breadcrumb for the current route`, async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        {
          url: [{ path: 'test' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'test.breadcrumb' } },
          },
        },
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      expect(
        await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
      ).toEqual([]);
      expect(defaultResolver.resolveBreadcrumbs).not.toHaveBeenCalled();
    });

    it(`should NOT return breadcrumb for the current route '(case with '' path)`, async () => {
      mockActivatedRoutes$.next([
        { url: [] }, // root route
        {
          url: [{ path: 'test' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'test.breadcrumb' } },
          },
        },
        {
          url: [], // last route with empty '' path
        },
      ] as ActivatedRouteSnapshotWithPageMeta[]);

      expect(
        await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
      ).toEqual([]);
      expect(defaultResolver.resolveBreadcrumbs).not.toHaveBeenCalled();
    });

    it(`should return breadcrumbs only for the ancestors of the current route`, async () => {
      const testRoutes = [
        { url: [] }, // root route
        {
          url: [{ path: 'grandparent' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'grandparent.breadcrumb' } },
          },
        },
        {
          url: [{ path: 'parent' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'parent.breadcrumb' } },
          },
        },
        {
          url: [{ path: 'child' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'child.breadcrumb' } },
          },
        },
      ] as ActivatedRouteSnapshotWithPageMeta[];

      mockActivatedRoutes$.next(testRoutes);

      expect(
        await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
      ).toEqual([
        { link: '/grandparent', label: 'grandparent.breadcrumb' },
        { link: '/grandparent/parent', label: 'parent.breadcrumb' },
      ]);
      expect(defaultResolver.resolveBreadcrumbs).toHaveBeenCalledWith({
        url: '/grandparent',
        pageMetaConfig: testRoutes[1].routeConfig.data.cxPageMeta,
        route: testRoutes[1],
      });
      expect(defaultResolver.resolveBreadcrumbs).toHaveBeenCalledWith({
        url: '/grandparent/parent',
        pageMetaConfig: testRoutes[2].routeConfig.data.cxPageMeta,
        route: testRoutes[2],
      });
    });

    it(`should return breadcrumbs only for the ancestor routes (case with '' path)`, async () => {
      const testRoutes = [
        { url: [] }, // root route
        {
          url: [{ path: 'grandparent' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'grandparent.breadcrumb' } },
          },
        },
        {
          url: [{ path: 'parent' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'parent.breadcrumb' } },
          },
        },
        {
          url: [{ path: 'child' }],
          routeConfig: {
            data: { cxPageMeta: { breadcrumb: 'child.breadcrumb' } },
          },
        },
        {
          url: [], // route with empty '' path
        },
      ] as ActivatedRouteSnapshotWithPageMeta[];

      mockActivatedRoutes$.next(testRoutes);

      expect(
        await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
      ).toEqual([
        { link: '/grandparent', label: 'grandparent.breadcrumb' },
        { link: '/grandparent/parent', label: 'parent.breadcrumb' },
      ]);
    });

    describe('when passed option includeCurrentRoute = true', () => {
      it(`should return breadcrumbs for all activated routes (including current route)`, async () => {
        const testRoutes = [
          { url: [] }, // root route
          {
            url: [{ path: 'grandparent' }],
            routeConfig: {
              data: { cxPageMeta: { breadcrumb: 'grandparent.breadcrumb' } },
            },
          },
          {
            url: [{ path: 'parent' }],
            routeConfig: {
              data: { cxPageMeta: { breadcrumb: 'parent.breadcrumb' } },
            },
          },
          {
            url: [{ path: 'child' }],
            routeConfig: {
              data: { cxPageMeta: { breadcrumb: 'child.breadcrumb' } },
            },
          },
        ] as ActivatedRouteSnapshotWithPageMeta[];

        mockActivatedRoutes$.next(testRoutes);

        expect(
          await resolver
            .resolveBreadcrumbs({ includeCurrentRoute: true })
            .pipe(take(1))
            .toPromise()
        ).toEqual([
          { link: '/grandparent', label: 'grandparent.breadcrumb' },
          { link: '/grandparent/parent', label: 'parent.breadcrumb' },
          { link: '/grandparent/parent/child', label: 'child.breadcrumb' },
        ]);
      });
    });
  });
});
