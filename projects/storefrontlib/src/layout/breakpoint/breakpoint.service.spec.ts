import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BREAKPOINT, LayoutConfig } from '../config/layout-config';
import { BreakpointService } from './breakpoint.service';

const NUM_100 = 100;
const NUM_200 = 200;
const NUM_300 = 300;
const NUM_400 = 400;
const NUM_500 = 500;
const NUM_501 = 501;
const NUM_576 = 576;
const NUM_700 = 700;
const NUM_701 = 701;
const NUM_768 = 768;
const NUM_992 = 992;
const NUM_900 = 900;
const NUM_901 = 901;
const NUM_1200 = 1200;
const NUM_1201 = 1201;
const NUM_1300 = 1300;

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
      const size = service.getSize(BREAKPOINT.xs);
      expect(size).toEqual(NUM_576);
    });

    it('should return maximum 768 for SM', () => {
      const size = service.getSize(BREAKPOINT.sm);
      expect(size).toEqual(NUM_768);
    });

    it('should return maximum 992 for MD', () => {
      const size = service.getSize(BREAKPOINT.md);
      expect(size).toEqual(NUM_992);
    });

    it('should return maximum 1200 for LG', () => {
      const size = service.getSize(BREAKPOINT.lg);
      expect(size).toEqual(NUM_1200);
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
      const size = service.getSize(BREAKPOINT.xs);
      expect(size).toEqual(NUM_100);
    });

    it('should return the maximum configured size for SM', () => {
      const size = service.getSize(BREAKPOINT.sm);
      expect(size).toEqual(NUM_200);
    });

    it('should return the maximum configured size for MD', () => {
      const size = service.getSize(BREAKPOINT.md);
      expect(size).toEqual(NUM_300);
    });

    it('should return the maximum configured size for LG', () => {
      const size = service.getSize(BREAKPOINT.lg);
      expect(size).toEqual(NUM_400);
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
      MockWindow.target.innerWidth = NUM_576;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.xs);
    });

    it('should return sm for <= 768', () => {
      MockWindow.target.innerWidth = NUM_768;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.sm);
    });

    it('should return md for <= 992', () => {
      MockWindow.target.innerWidth = NUM_992;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.md);
    });

    it('should return lg for < 1200', () => {
      MockWindow.target.innerWidth = NUM_1200;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.lg);
    });

    it('should return xl for >= 1201', () => {
      MockWindow.target.innerWidth = NUM_1201;
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
        expect(isEqual(NUM_500, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if current screen size equals sm', () => {
        expect(isEqual(NUM_700, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if current screen size equals md', () => {
        expect(isEqual(NUM_900, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if current screen size equals lg', () => {
        expect(isEqual(NUM_1200, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return true if current screen size equals xl', () => {
        expect(isEqual(NUM_1300, BREAKPOINT.xl)).toBeTruthy();
      });

      it('should return false if current screen is larger than xs', () => {
        expect(isEqual(NUM_500 + 1, BREAKPOINT.xs)).toBeFalsy();
      });

      it('should return false if current screen is larger than sm', () => {
        expect(isEqual(NUM_700 + 1, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if current screen is larger than md', () => {
        expect(isEqual(NUM_900 + 1, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if current screen is larger than lg', () => {
        expect(isEqual(NUM_1200 + 1, BREAKPOINT.lg)).toBeFalsy();
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
        expect(isDown(NUM_500, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if window width <= sm', () => {
        expect(isDown(NUM_700, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if window width <= md', () => {
        expect(isDown(NUM_900, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if window width <= lg', () => {
        expect(isDown(NUM_1200, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return false if window width > xs', () => {
        expect(isDown(NUM_501, BREAKPOINT.xs)).toBeFalsy();
      });

      it('should return false if window width > sm', () => {
        expect(isDown(NUM_701, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if window width > md', () => {
        expect(isDown(NUM_901, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if window width > lg', () => {
        expect(isDown(NUM_1201, BREAKPOINT.lg)).toBeFalsy();
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
        expect(isUp(NUM_500, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if window width <= md', () => {
        expect(isUp(NUM_700, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if window width <= lg', () => {
        expect(isUp(NUM_900, BREAKPOINT.lg)).toBeFalsy();
      });

      it('should return false if window width <= xl', () => {
        expect(isUp(NUM_1200, BREAKPOINT.xl)).toBeFalsy();
      });

      it('should return true if window width > xs', () => {
        expect(isUp(1, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if window width > sm', () => {
        expect(isUp(NUM_500 + 1, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if window width > md', () => {
        expect(isUp(NUM_700 + 1, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if window width > lg', () => {
        expect(isUp(NUM_900 + 1, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return true if window width > xl', () => {
        expect(isUp(NUM_1200 + 1, BREAKPOINT.xl)).toBeTruthy();
      });
    });
  });
});
