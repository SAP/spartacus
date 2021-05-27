import { TestBed } from '@angular/core/testing';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  I18nTestingModule,
  PageRobotsMeta,
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { SavedCartPageMetaResolver } from './saved-cart-page-meta.resolver';

const testHomeBreadcrumb: BreadcrumbMeta = { label: 'Test Home', link: '/' };

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of({ state: {} } as RouterState);
  }
}

class MockBasePageMetaResolver {
  resolveTitle() {
    return of('testContentPageTitle');
  }
  resolveBreadcrumbs() {
    return of([testHomeBreadcrumb]);
  }
  resolveRobots() {
    return of([]);
  }
}

const savedCartUrl = '/my-account/saved-carts';
const savedCartTranslationKey = 'savedCartList.breadcrumb';
const savedCartBreadcrumb: BreadcrumbMeta = {
  label: savedCartTranslationKey,
  link: savedCartUrl,
};
class MockSemanticPathService implements Partial<SemanticPathService> {
  get = jasmine.createSpy('get').and.returnValue(savedCartUrl);
}

describe('SavedCartPageMetaResolver', () => {
  let resolver: SavedCartPageMetaResolver;
  let routingService: RoutingService;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },

        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    resolver = TestBed.inject(SavedCartPageMetaResolver);
    routingService = TestBed.inject(RoutingService);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
  });

  describe('resolveTitle', () => {
    it('should emit title of CMS content page ', async () => {
      expect(await resolver.resolveTitle().pipe(take(1)).toPromise()).toBe(
        'testContentPageTitle'
      );
    });
  });

  describe('resolveBreadcrumbs', () => {
    describe('when being on the Saved Cart page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'savedCarts' } } as any)
        );
      });

      it('should NOT return breadcrumb for the Saved Cart page', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([testHomeBreadcrumb]);
      });
    });

    describe('when being on Saved Cart Details page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'savedCartsDetails' } } as any)
        );

        spyOn(basePageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
          of([testHomeBreadcrumb, savedCartBreadcrumb])
        );
      });

      it('should insert breadcrumb for the Saved Cart page right after the Homepage breadcrumb', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([testHomeBreadcrumb, savedCartBreadcrumb]);
      });
    });
  });

  describe('resolveRobots', () => {
    it('should resolve title from the BasePageMetaResolver', async () => {
      spyOn(basePageMetaResolver, 'resolveRobots').and.returnValue(
        of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX])
      );
      let result;
      resolver
        .resolveRobots()
        .subscribe((robots) => (result = robots))
        .unsubscribe();
      expect(result).toContain(PageRobotsMeta.FOLLOW);
      expect(result).toContain(PageRobotsMeta.INDEX);
    });
  });
});
