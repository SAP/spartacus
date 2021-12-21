import { ViewportScroller } from '@angular/common';
import { ApplicationRef, Component, Injector } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { OnNavigateConfig } from '@spartacus/storefront';
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
  template: ` <cx-storefront tabindex="0"></cx-storefront> `,
})
class MockComponent {}

const mockComponentRef = {
  location: { nativeElement: { ...MockComponent, focus: (): void => {} } },
};

class MockInjector implements Partial<Injector> {
  get(_token: any): ApplicationRef {
    return { components: [mockComponentRef] } as any;
  }
}

const mockEvents$ = new Subject<Scroll>();
class MockRouter implements Partial<Router> {
  events = mockEvents$.asObservable();
}

class MockViewPortScroller implements Partial<ViewportScroller> {
  scrollToPosition(_position: [number, number]): void {}
}

function emitPairScrollEvent(
  position: [number, number] | null,
  currentRoute: string = '/test2',
  previousRoute: string = '/test1'
) {
  mockEvents$.next(
    new Scroll(new NavigationEnd(1, previousRoute, previousRoute), null, null)
  );
  mockEvents$.next(
    new Scroll(new NavigationEnd(2, currentRoute, currentRoute), position, null)
  );
}

describe('OnNavigateService', () => {
  let service: OnNavigateService;
  let config: OnNavigateConfig;
  let viewportScroller: ViewportScroller;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
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
      ],
    }).compileComponents();

    service = TestBed.inject(OnNavigateService);
    config = TestBed.inject(OnNavigateConfig);
    viewportScroller = TestBed.inject(ViewportScroller);

    config.enableResetViewOnNavigate.active = true;
    config.enableResetViewOnNavigate.ignoreQueryString = false;
    config.enableResetViewOnNavigate.ignoreRoutes = [];
    spyOn(service, 'setResetViewOnNavigate').and.callThrough();
    spyOn(viewportScroller, 'scrollToPosition').and.callThrough();
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
    it('should scroll to the top on navigation when no position (forward navigation)', fakeAsync(() => {
      service.setResetViewOnNavigate(true);

      emitPairScrollEvent(null);

      tick(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    }));

    it('should NOT scroll to the top on navigation when route has query strings', () => {
      config.enableResetViewOnNavigate.ignoreQueryString = true;

      service.setResetViewOnNavigate(true);

      emitPairScrollEvent(null, '/test2?spartacus=true', '/test2');

      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalledWith([
        0, 0,
      ]);
    });

    it('should NOT scroll to the top on navigation when route is a child route', () => {
      config.enableResetViewOnNavigate.ignoreRoutes = ['test2'];

      service.setResetViewOnNavigate(true);

      emitPairScrollEvent(null, '/test2/newtestroute');

      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalledWith([
        0, 0,
      ]);
    });

    it('should scroll to the top on navigation when route is not part of the ignored config routes', fakeAsync(() => {
      config.enableResetViewOnNavigate.ignoreRoutes = ['test1', 'test2'];

      service.setResetViewOnNavigate(true);

      emitPairScrollEvent(null, '/test3');

      tick(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    }));

    it('should scroll to a position on navigation when scroll contains position (backward navigation)', fakeAsync(() => {
      service.setResetViewOnNavigate(true);

      emitPairScrollEvent([1000, 500]);

      tick(100);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([
        1000, 500,
      ]);
    }));

    it('should NOT scroll when on navigation is disabled', () => {
      service.setResetViewOnNavigate(false);

      emitPairScrollEvent(null);

      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled();
    });

    it('should trigger focus on any navigation', () => {
      spyOn(mockComponentRef.location.nativeElement, 'focus').and.callThrough();
      service.setResetViewOnNavigate(true);

      emitPairScrollEvent(null);

      expect(mockComponentRef.location.nativeElement.focus).toHaveBeenCalled();

      emitPairScrollEvent([1000, 500]);

      expect(mockComponentRef.location.nativeElement.focus).toHaveBeenCalled();
    });
  });
});
