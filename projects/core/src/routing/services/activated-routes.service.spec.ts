import { TestBed } from '@angular/core/testing';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterState,
} from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoutesService } from './activated-routes.service';

describe('ActivatedRoutesService', () => {
  let service: ActivatedRoutesService;
  let router: Router;
  let mockRouterEvents$: Subject<RouterEvent>;

  beforeEach(() => {
    mockRouterEvents$ = new Subject<RouterEvent>();

    class MockRouter implements Partial<Router> {
      events = mockRouterEvents$;
      routerState = { snapshot: { root: {} } } as any;
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    });
    service = TestBed.inject(ActivatedRoutesService);
    router = TestBed.inject(Router);
  });

  afterEach(() => mockRouterEvents$.complete());

  describe(`routes$`, () => {
    it('should emit on subscription', async () => {
      expect(await service.routes$.pipe(take(1)).toPromise()).toEqual([
        router.routerState.snapshot.root,
      ]);
    });

    it('should emit on every NavigationEnd event', async () => {
      const results = [];
      service.routes$.subscribe((res) => results.push(res));
      expect(results.length).toBe(1);
      mockRouterEvents$.next(new NavigationEnd(null, null, null));
      expect(results.length).toBe(2);
    });

    it('should not emit on other Navigation events', async () => {
      const results = [];
      service.routes$.subscribe((res) => results.push(res));
      expect(results.length).toBe(1);
      mockRouterEvents$.next(new NavigationStart(null, null, null));
      mockRouterEvents$.next(new NavigationCancel(null, null, null));
      mockRouterEvents$.next(new NavigationError(null, null, null));
      expect(results.length).toBe(1);
    });

    it('should emit array of activated routes', async () => {
      const mockRouterState: RouterState = <RouterState>{
        snapshot: {
          root: {
            component: null,
            firstChild: {
              component: 'parent',
              firstChild: {
                component: 'child',
                firstChild: null,
              },
            },
          },
        },
      };
      (router as any).routerState = mockRouterState; // as any => mitigate readonly

      expect(await service.routes$.pipe(take(1)).toPromise()).toEqual([
        mockRouterState.snapshot.root,
        mockRouterState.snapshot.root.firstChild,
        mockRouterState.snapshot.root.firstChild.firstChild,
      ]);
    });
  });
});
