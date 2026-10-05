import { ViewportScroller } from '@angular/common';
import { ApplicationRef, Component, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  NavigationEnd,
  Router,
  ROUTER_CONFIGURATION,
  Scroll,
} from '@angular/router';
// eslint-disable-next-line
import { OnNavigateConfig, StorefrontComponent } from '@spartacus/storefront';
import { Subject } from 'rxjs';
import { OnNavigateService } from './on-navigate.service';

const mockOnNavigateConfig: OnNavigateConfig = {
  enableResetViewOnNavigate: {
    active: true,
    ignoreQueryString: false,
    ignoreRoutes: [],
  },
};

@Component({
  template: ` <cx-storefront tabindex="0" /> `,
  imports: [StorefrontComponent],
})
class MockComponent {}

const mockComponentRef = {
  location: { nativeElement: { ...MockComponent, focus: (): void => {} } },
};

const mockElement = {
  focus: (): void => {},
};

class MockInjector implements Partial<Injector> {
  get(_token: any): ApplicationRef {
    return {
      components: [mockComponentRef],
      getElementsByTagName: (el: string) => {
        return el ? [mockElement] : undefined;
      },
    } as any;
  }
}

let mockEvents$: Subject<Scroll>;
class MockRouter implements Partial<Router> {
  get events() {
    return mockEvents$.asObservable();
  }
  options = { anchorScrolling: 'enabled' } as any;
}

class MockViewPortScroller implements Partial<ViewportScroller> {
  scrollToPosition(_position: [number, number]): void {}
  setHistoryScrollRestoration(_scrollRestoration: 'auto' | 'manual'): void {}
  scrollToAnchor(_anchor: string): void {}
}

function emitScrollEvent(
  position: [number, number] | null,
  route: string = '/test2',
  anchor: string = '',
  id: number = 1
) {
  mockEvents$.next(
    new Scroll(new NavigationEnd(id, route, route), position, anchor)
  );
}

describe('OnNavigateService', () => {
  let service: OnNavigateService;
  // `enableResetViewOnNavigate` is always set in `beforeEach`, so narrow it to
  // non-optional here to avoid "possibly undefined" on every test access.
  let config: OnNavigateConfig & {
    enableResetViewOnNavigate: NonNullable<
      OnNavigateConfig['enableResetViewOnNavigate']
    >;
  };
  let viewportScroller: ViewportScroller;

  beforeEach(() => {
    vi.useFakeTimers();
    mockEvents$ = new Subject<Scroll>();

    TestBed.configureTestingModule({
      providers: [
        OnNavigateService,
        {
          provide: OnNavigateConfig,
          useValue: mockOnNavigateConfig,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: ViewportScroller,
          useClass: MockViewPortScroller,
        },
        {
          provide: Injector,
          useClass: MockInjector,
        },
        {
          provide: ROUTER_CONFIGURATION,
          useValue: { anchorScrolling: 'enabled' },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(OnNavigateService);
    config = TestBed.inject(OnNavigateConfig) as typeof config;
    viewportScroller = TestBed.inject(ViewportScroller);

    config.enableResetViewOnNavigate = {
      active: true,
      ignoreQueryString: false,
      ignoreRoutes: [],
    };

    vi.spyOn(service, 'setResetViewOnNavigate');
    vi.spyOn(viewportScroller, 'scrollToPosition');
    vi.spyOn(viewportScroller, 'scrollToAnchor');
  });

  afterEach(async () => {
    service.setResetViewOnNavigate(false);
    await vi.runAllTimersAsync();
    vi.useRealTimers();
  });

  describe('initializeWithConfig()', () => {
    it('should call setResetViewOnNavigate() when config has flag set', () => {
      expect(service.setResetViewOnNavigate).not.toHaveBeenCalled();
      service.initializeWithConfig();
      expect(service.setResetViewOnNavigate).toHaveBeenCalled();
    });

    it('should NOT call setResetViewOnNavigate() when config has flag NOT set', () => {
      config.enableResetViewOnNavigate.active = false;

      expect(service.setResetViewOnNavigate).not.toHaveBeenCalled();
      service.initializeWithConfig();
      expect(service.setResetViewOnNavigate).not.toHaveBeenCalled();
    });
  });

  describe('setResetViewOnNavigate()', () => {
    it('should scroll to the top on navigation when no position (forward navigation)', async () => {
      service.setResetViewOnNavigate(true);

      emitScrollEvent(null);

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });

    it('should handle the first scroll event (e.g. the initial navigation under hydration, where it is the only emission)', async () => {
      vi.spyOn(mockComponentRef.location.nativeElement, 'focus');
      service.setResetViewOnNavigate(true);

      emitScrollEvent(null, '/test2');

      // eslint-disable-next-line
      expect(mockComponentRef.location.nativeElement.focus).toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });

    it('should NOT scroll to the top when only the query string changes on the same path', async () => {
      config.enableResetViewOnNavigate.ignoreQueryString = true;

      service.setResetViewOnNavigate(true);

      // first navigation establishes the previous route
      emitScrollEvent(null, '/test2', '', 1);
      await vi.advanceTimersByTimeAsync(100);
      vi.mocked(viewportScroller.scrollToPosition).mockClear();

      // navigating to the same path with only a query string change must not scroll
      emitScrollEvent(null, '/test2?spartacus=true', '', 2);
      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled();
    });

    it('should scroll to the top with ignoreQueryString on the first navigation when there is no previous route', async () => {
      config.enableResetViewOnNavigate.ignoreQueryString = true;

      service.setResetViewOnNavigate(true);

      emitScrollEvent(null, '/test2?spartacus=true');

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });

    it('should NOT scroll to the top on navigation when route is a child route', async () => {
      config.enableResetViewOnNavigate.ignoreRoutes = ['test2'];

      service.setResetViewOnNavigate(true);

      emitScrollEvent(null, '/test2/newtestroute');

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalledWith([
        0, 0,
      ]);
    });

    it('should call scrollToAnchor when anchor exist', async () => {
      service.setResetViewOnNavigate(true);
      const anchor = 'a001';
      emitScrollEvent(null, '/test3', anchor);

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith(anchor);
    });

    it('should scroll to the top on navigation when route is not part of the ignored config routes', async () => {
      config.enableResetViewOnNavigate.ignoreRoutes = ['test1', 'test2'];

      service.setResetViewOnNavigate(true);

      emitScrollEvent(null, '/test3');

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });

    it('should scroll to a position on navigation when scroll contains position (backward navigation)', async () => {
      service.setResetViewOnNavigate(true);

      emitScrollEvent([1000, 500]);

      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([
        1000, 500,
      ]);
    });

    it('should NOT scroll when on navigation is disabled', () => {
      service.setResetViewOnNavigate(false);

      emitScrollEvent(null);

      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled();
    });

    it('should trigger focus on any navigation', () => {
      vi.spyOn(mockComponentRef.location.nativeElement, 'focus');
      service.setResetViewOnNavigate(true);

      emitScrollEvent(null, '/test2');
      // eslint-disable-next-line
      expect(mockComponentRef.location.nativeElement.focus).toHaveBeenCalled();

      emitScrollEvent([1000, 500], '/test3');
      // eslint-disable-next-line
      expect(mockComponentRef.location.nativeElement.focus).toHaveBeenCalled();
    });

    it('should reset the tracked previous route when re-enabled', async () => {
      config.enableResetViewOnNavigate.ignoreQueryString = true;

      service.setResetViewOnNavigate(true);
      emitScrollEvent(null, '/test2');
      await vi.advanceTimersByTimeAsync(100);

      // disabling then re-enabling must clear the tracked previous route
      service.setResetViewOnNavigate(false);
      service.setResetViewOnNavigate(true);
      vi.mocked(viewportScroller.scrollToPosition).mockClear();

      // same path as before: it would be suppressed if the previous route leaked
      emitScrollEvent(null, '/test2?spartacus=true');
      await vi.advanceTimersByTimeAsync(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });
  });

  describe('selectedHostElement', () => {
    beforeEach(() => {
      config.enableResetViewOnNavigate.selectedHostElement = 'cx-storefront';
    });

    it('should call focus on storefront component when selectedHostElement is set', () => {
      const ref: any = service.selectedHostElement;
      vi.spyOn(ref, 'focus');
      service.setResetViewOnNavigate(true);
      emitScrollEvent(null);
      expect(ref.focus).toHaveBeenCalled();
    });
  });
});
