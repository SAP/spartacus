import { TestBed } from '@angular/core/testing';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { ActivatedRoutesService } from './activated-routes.service';

describe('ActivatedRoutesService', () => {
  let service: ActivatedRoutesService;
  let router: Router;
  let mockRouterEvents$: Subject<Event>;

  beforeEach(() => {
    mockRouterEvents$ = new Subject<Event>();

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
      expect(await firstValueFrom(service.routes$)).toEqual([
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
      const mockRouterState: any = {
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

      expect(await firstValueFrom(service.routes$)).toEqual([
        mockRouterState.snapshot.root,
        mockRouterState.snapshot.root.firstChild,
        mockRouterState.snapshot.root.firstChild.firstChild,
      ]);
    });
  });
});
