import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BREAKPOINT, LayoutConfig } from '../config/layout-config';
import { BreakpointService } from './breakpoint.service';

const SCREEN_SIZE_XS = 500;
const SCREEN_SIZE_SM = 700;
const SCREEN_SIZE_MD = 900;
const SCREEN_SIZE_LG = 1200;

const WINDOW_WIDTH_SM = 500;
const WINDOW_WIDTH_MD = 700;
const WINDOW_WIDTH_LG = 900;
const WINDOW_WIDTH_XL = 1200;

class MockWindowRef {
  nativeWindow = {
    innerWidth: 1000,
  };
  get resize$(): Observable<any> {
    return;
  }
}
const MockWindow = {
  target: {
    innerWidth: 0,
  },
};

describe('BreakpointService', () => {
  let service: BreakpointService;
  let config: LayoutConfig;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: LayoutConfig, useValue: {} },
        BreakpointService,
      ],
    });
    service = TestBed.inject(BreakpointService);
    config = TestBed.inject(LayoutConfig);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support 5 ordered breakpoints', () => {
    expect(service.breakpoints).toEqual([
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ]);
  });

  describe('with default sizes', () => {
    beforeEach(() => {
      config.breakpoints = {};
    });

    it('should return maximum 576 for XS', () => {
      const EXPECTED_SIZE = 576;
      const size = service.getSize(BREAKPOINT.xs);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should return maximum 768 for SM', () => {
      const EXPECTED_SIZE = 768;
      const size = service.getSize(BREAKPOINT.sm);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should return maximum 992 for MD', () => {
      const EXPECTED_SIZE = 992;
      const size = service.getSize(BREAKPOINT.md);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should return maximum 1200 for LG', () => {
      const EXPECTED_SIZE = 1200;
      const size = service.getSize(BREAKPOINT.lg);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should not return a max size for XL', () => {
      const size = service.getSize(BREAKPOINT.xl);
      expect(size).toBeFalsy();
    });
  });

  describe('with configured sizes', () => {
    beforeEach(() => {
      config.breakpoints = {
        xs: 100,
        sm: 200,
        md: 300,
        lg: 400,
      };
    });

    it('should return the maximum configured size for XS', () => {
      const EXPECTED_SIZE = 100;
      const size = service.getSize(BREAKPOINT.xs);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should return the maximum configured size for SM', () => {
      const EXPECTED_SIZE = 200;
      const size = service.getSize(BREAKPOINT.sm);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should return the maximum configured size for MD', () => {
      const EXPECTED_SIZE = 300;
      const size = service.getSize(BREAKPOINT.md);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should return the maximum configured size for LG', () => {
      const EXPECTED_SIZE = 400;
      const size = service.getSize(BREAKPOINT.lg);
      expect(size).toEqual(EXPECTED_SIZE);
    });

    it('should not return a max size for XL', () => {
      const size = service.getSize(BREAKPOINT.xl);
      expect(size).toBeFalsy();
    });
  });

  describe('with current window size', () => {
    beforeEach(() => {
      config.breakpoints = {};
    });

    it('should return xs for <= 576', () => {
      const INPUT_WIDTH = 576;
      MockWindow.target.innerWidth = INPUT_WIDTH;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.xs);
    });

    it('should return sm for <= 768', () => {
      const INPUT_WIDTH = 768;
      MockWindow.target.innerWidth = INPUT_WIDTH;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.sm);
    });

    it('should return md for <= 992', () => {
      const INPUT_WIDTH = 992;
      MockWindow.target.innerWidth = INPUT_WIDTH;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.md);
    });

    it('should return lg for < 1200', () => {
      const INPUT_WIDTH = 1200;
      MockWindow.target.innerWidth = INPUT_WIDTH;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.lg);
    });

    it('should return xl for >= 1201', () => {
      const INPUT_WIDTH = 1201;
      MockWindow.target.innerWidth = INPUT_WIDTH;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.xl);
    });
  });

  describe('match size', () => {
    beforeEach(() => {
      config.breakpoints = {
        xs: 500, // xs = > 500
        sm: 700, // sm = 501 - 700
        md: 900, // md = 701 - 900
        lg: 1200, // lg = 901 - 1200
        // xl = > 1201
      };
    });

    describe('isEqual', () => {
      const isEqual = (screenSize: number, breakpoint: BREAKPOINT): boolean => {
        MockWindow.target.innerWidth = screenSize;
        spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
        let result: boolean;
        service
          .isEqual(breakpoint)
          .subscribe((br) => (result = br))
          .unsubscribe();
        return result;
      };

      it('should return true if current screen size equals xs', () => {
        expect(isEqual(SCREEN_SIZE_XS, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if current screen size equals sm', () => {
        expect(isEqual(SCREEN_SIZE_SM, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if current screen size equals md', () => {
        expect(isEqual(SCREEN_SIZE_MD, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if current screen size equals lg', () => {
        expect(isEqual(SCREEN_SIZE_LG, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return true if current screen size equals xl', () => {
        const SCREEN_SIZE = 1300;
        expect(isEqual(SCREEN_SIZE, BREAKPOINT.xl)).toBeTruthy();
      });

      it('should return false if current screen is larger than xs', () => {
        expect(isEqual(SCREEN_SIZE_XS + 1, BREAKPOINT.xs)).toBeFalsy();
      });

      it('should return false if current screen is larger than sm', () => {
        expect(isEqual(SCREEN_SIZE_SM + 1, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if current screen is larger than md', () => {
        expect(isEqual(SCREEN_SIZE_MD + 1, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if current screen is larger than lg', () => {
        expect(isEqual(SCREEN_SIZE_LG + 1, BREAKPOINT.lg)).toBeFalsy();
      });
    });

    describe('isDown', () => {
      const isDown = (screenSize: number, breakpoint: BREAKPOINT): boolean => {
        MockWindow.target.innerWidth = screenSize;
        spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
        let result: boolean;
        service
          .isDown(breakpoint)
          .subscribe((br) => (result = br))
          .unsubscribe();
        return result;
      };

      it('should return true if window width <= xs', () => {
        expect(isDown(SCREEN_SIZE_XS, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if window width <= sm', () => {
        expect(isDown(SCREEN_SIZE_SM, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if window width <= md', () => {
        expect(isDown(SCREEN_SIZE_MD, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if window width <= lg', () => {
        expect(isDown(SCREEN_SIZE_LG, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return false if window width > xs', () => {
        const SCREEN_SIZE = 501;
        expect(isDown(SCREEN_SIZE, BREAKPOINT.xs)).toBeFalsy();
      });

      it('should return false if window width > sm', () => {
        const SCREEN_SIZE = 701;
        expect(isDown(SCREEN_SIZE, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if window width > md', () => {
        const SCREEN_SIZE = 901;
        expect(isDown(SCREEN_SIZE, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if window width > lg', () => {
        const SCREEN_SIZE = 1201;
        expect(isDown(SCREEN_SIZE, BREAKPOINT.lg)).toBeFalsy();
      });
    });

    describe('isUp', () => {
      const isUp = (screenSize: number, breakpoint: BREAKPOINT): boolean => {
        MockWindow.target.innerWidth = screenSize;
        spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
        let result: boolean;
        service
          .isUp(breakpoint)
          .subscribe((br) => (result = br))
          .unsubscribe();
        return result;
      };

      it('should return true for xs', () => {
        expect(isUp(1, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return false if window width <= sm', () => {
        expect(isUp(WINDOW_WIDTH_SM, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if window width <= md', () => {
        expect(isUp(WINDOW_WIDTH_MD, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if window width <= lg', () => {
        expect(isUp(WINDOW_WIDTH_LG, BREAKPOINT.lg)).toBeFalsy();
      });

      it('should return false if window width <= xl', () => {
        expect(isUp(WINDOW_WIDTH_XL, BREAKPOINT.xl)).toBeFalsy();
      });

      it('should return true if window width > xs', () => {
        expect(isUp(1, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if window width > sm', () => {
        expect(isUp(WINDOW_WIDTH_SM + 1, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if window width > md', () => {
        expect(isUp(WINDOW_WIDTH_MD + 1, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if window width > lg', () => {
        expect(isUp(WINDOW_WIDTH_LG + 1, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return true if window width > xl', () => {
        expect(isUp(WINDOW_WIDTH_XL + 1, BREAKPOINT.xl)).toBeTruthy();
      });
    });
  });
});
