import { ViewportScroller } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OnNavigateConfig } from '@spartacus/storefront';
import { Subject } from 'rxjs';
import { OnNavigateService } from './on-navigate.service';

const mockOnNavigateConfig: OnNavigateConfig = {
  enableResetViewOnNavigate: {
    active: true,
  },
};

const mockEvents$ = new Subject<Scroll>();
class MockRouter implements Partial<Router> {
  events = mockEvents$.asObservable();
}

// class MockViewPortScroller implements Partial<ViewportScroller> {
//   scrollToPosition(_position: [number, number]): void {}
// }

fdescribe('OnNavigateService', () => {
  let service: OnNavigateService;
  let config: OnNavigateConfig;
  let viewportScroller: ViewportScroller;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
        ViewportScroller,
        // {
        //   provide: ViewportScroller,
        //   useClass: MockViewPortScroller,
        // },
      ],
    }).compileComponents();

    service = TestBed.inject(OnNavigateService);
    config = TestBed.inject(OnNavigateConfig);
    viewportScroller = TestBed.inject(ViewportScroller);

    config.enableResetViewOnNavigate.active = true;
    spyOn(service, 'setResetViewOnNavigate').and.callThrough();
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
    beforeEach(() => {
      spyOn(viewportScroller, 'scrollToPosition');
    });

    it('should scroll to the top on navigation when no position (forward navigation)', () => {
      mockEvents$.next(
        new Scroll(new NavigationEnd(1, '/test', '/test'), null, null)
      );
      mockEvents$.next(
        new Scroll(new NavigationEnd(2, '/test2', '/test2'), null, null)
      );

      service.setResetViewOnNavigate(true);

      expect(viewportScroller.scrollToPosition).toHaveBeenCalled();
    });

    it('should scroll to a position on navigation when no position (backward navigation)', () => {
      console.log('in here');
      mockEvents$.next(
        new Scroll(new NavigationEnd(2, '/test2', '/test2'), [1000, 500], null)
      );
      service.setResetViewOnNavigate(true);
      expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([
        1000,
        500,
      ]);
    });

    it('should NOT scroll when on navigation when disabled', () => {
      service.setResetViewOnNavigate(false);
      expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled();
    });
  });
});
