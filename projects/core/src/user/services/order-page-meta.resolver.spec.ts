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
import { OrderPageMetaResolver } from './order-page-meta.resolver';

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

const orderCartUrl = '/my-account/orders';
const orderTranslationKey = 'breadcrumb';
const orderBreadcrumb: BreadcrumbMeta = {
  label: orderTranslationKey,
  link: orderCartUrl,
};
class MockSemanticPathService implements Partial<SemanticPathService> {
  get = jasmine.createSpy('get').and.returnValue(orderCartUrl);
}

describe('OrderPageMetaResolver', () => {
  let resolver: OrderPageMetaResolver;
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

    resolver = TestBed.inject(OrderPageMetaResolver);
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
    describe('when being on the Order page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'orders' } } as any)
        );
      });

      it('should NOT return breadcrumb for the Order page', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([testHomeBreadcrumb]);
      });
    });

    describe('when being on Order Details page', () => {
      beforeEach(() => {
        spyOn(routingService, 'getRouterState').and.returnValue(
          of({ state: { semanticRoute: 'orderDetails' } } as any)
        );

        spyOn(basePageMetaResolver, 'resolveBreadcrumbs').and.returnValue(
          of([testHomeBreadcrumb, orderBreadcrumb])
        );
      });

      it('should insert breadcrumb for the Order page right after the Homepage breadcrumb', async () => {
        expect(
          await resolver.resolveBreadcrumbs().pipe(take(1)).toPromise()
        ).toEqual([testHomeBreadcrumb, orderBreadcrumb]);
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
