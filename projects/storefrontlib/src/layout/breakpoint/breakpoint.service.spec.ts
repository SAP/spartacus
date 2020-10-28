import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BREAKPOINT, LayoutConfig } from '../config/layout-config';
import { BreakpointService } from './breakpoint.service';

class MockWindowRef {
  nativeWindow = {
    innerWidth: 1000,
  };
  get resize$(): Observable<any> {
    return of();
  }
}
const MockWindow = {
  target: {
    innerWidth: 0,
  },
};

// unordered config
const mockConfig: LayoutConfig = {
  breakpoints: {},
};

describe('BreakpointService', () => {
  let service: BreakpointService;
  let config: LayoutConfig;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: LayoutConfig, useValue: mockConfig },
        BreakpointService,
      ],
    });
    config = TestBed.inject(LayoutConfig);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    service = TestBed.inject(BreakpointService);
    expect(service).toBeTruthy();
  });

  describe('resolve sorted breakpoints from config', () => {
    it('should resolve [xs,sm,md,lg,xl] from config', () => {
      config.breakpoints = {
        xl: {
          min: 1200,
        },
        sm: {
          min: 576,
          max: 768,
        },
        lg: {
          max: 1200,
        },
        md: 992,
        xs: 576,
      };
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual([
        BREAKPOINT.xs,
        BREAKPOINT.sm,
        BREAKPOINT.md,
        BREAKPOINT.lg,
        BREAKPOINT.xl,
      ]);
    });

    it('should resolve [sm,xl] by numeric values', () => {
      config.breakpoints = {
        xl: 1200,
        sm: 768,
      };
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual([BREAKPOINT.sm, BREAKPOINT.xl]);
    });

    it('should resolve [sm,xl] by min values', () => {
      config.breakpoints = {
        xl: {
          min: 1200,
        },
        sm: {
          min: 576,
        },
      };
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual([BREAKPOINT.sm, BREAKPOINT.xl]);
    });

    it('should resolve [sm,xl] by min and max', () => {
      config.breakpoints = {
        xl: {
          min: 1200,
        },
        sm: {
          max: 768,
        },
      };
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual([BREAKPOINT.sm, BREAKPOINT.xl]);
    });

    it('should resolve [sm,xl] by min and numeric', () => {
      config.breakpoints = {
        xl: {
          min: 1200,
        },
        sm: 768,
      };
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual([BREAKPOINT.sm, BREAKPOINT.xl]);
    });

    it('should resolve [xs,lg] by bin and default values', () => {
      config.breakpoints = config.breakpoints = {
        xs: 576,
        lg: {
          min: 992,
        },
      };
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual(['xs', 'lg'] as any);
    });

    it('should resolve any screen', () => {
      // type augmentation allows for this
      config.breakpoints = {
        screen: {
          min: 1200,
        },
        any: 768,
      } as any;
      service = TestBed.inject(BreakpointService);
      expect(service.breakpoints).toEqual(['any', 'screen'] as any);
    });
  });

  describe('breakpoint size', () => {
    beforeEach(() => {
      config.breakpoints = {
        xs: 576,
        sm: {
          max: 768,
        },
        md: {
          min: 768,
          max: 992,
        },
        lg: {
          min: 992,
        },
        xl: {
          min: 1200,
        },
      };
      service = TestBed.inject(BreakpointService);
    });

    it('should return maximum 576 for XS', () => {
      const size = service.getSize(BREAKPOINT.xs);
      expect(size).toEqual(576);
    });

    it('should return maximum 768 for SM', () => {
      const size = service.getSize(BREAKPOINT.sm);
      expect(size).toEqual(768);
    });

    it('should return maximum 992 for MD', () => {
      const size = service.getSize(BREAKPOINT.md);
      expect(size).toEqual(992);
    });

    it('should return maximum 1200 for LG', () => {
      const size = service.getSize(BREAKPOINT.lg);
      expect(size).toEqual(1200);
    });

    it('should return falsy for XL', () => {
      const size = service.getSize(BREAKPOINT.xl);
      expect(size).toBeFalsy();
    });

    it('should return falsy for unknown screen', () => {
      const size = service.getSize('unknown' as any);
      expect(size).toBeFalsy();
    });
  });

  describe('with current window size', () => {
    beforeEach(() => {
      config.breakpoints = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: {
          min: 1200,
        },
      };
    });

    it('should return xs for < 576', () => {
      MockWindow.target.innerWidth = 575;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      service = TestBed.inject(BreakpointService);
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.xs);
    });

    it('should return sm for < 768', () => {
      MockWindow.target.innerWidth = 767;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      service = TestBed.inject(BreakpointService);
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.sm);
    });

    it('should return md for < 992', () => {
      MockWindow.target.innerWidth = 991;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      service = TestBed.inject(BreakpointService);
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.md);
    });

    it('should return lg for < 1200', () => {
      MockWindow.target.innerWidth = 1199;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      service = TestBed.inject(BreakpointService);
      let result: BREAKPOINT;
      service.breakpoint$.subscribe((br) => (result = br)).unsubscribe();
      expect(result).toEqual(BREAKPOINT.lg);
    });

    it('should return xl for >= 1201', () => {
      MockWindow.target.innerWidth = 1201;
      spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
      service = TestBed.inject(BreakpointService);
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
        xl: {
          min: 1200,
        },
      };
    });

    describe('isEqual', () => {
      const isEqual = (screenSize: number, breakpoint: BREAKPOINT): boolean => {
        MockWindow.target.innerWidth = screenSize;
        spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
        service = TestBed.inject(BreakpointService);
        let result: boolean;
        service
          .isEqual(breakpoint)
          .subscribe((br) => (result = br))
          .unsubscribe();
        return result;
      };

      it('should return true if current screen size is 0', () => {
        expect(isEqual(0, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return equals for xs on largest size', () => {
        expect(isEqual(500 - 1, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if current screen size equals sm', () => {
        expect(isEqual(700 - 1, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if current screen size equals md', () => {
        expect(isEqual(900 - 1, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if current screen size equals lg', () => {
        expect(isEqual(1200 - 1, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return true if current screen size equals xl', () => {
        expect(isEqual(1300, BREAKPOINT.xl)).toBeTruthy();
      });

      it('should return false if current screen is larger than xs', () => {
        expect(isEqual(500, BREAKPOINT.xs)).toBeFalsy();
      });

      it('should return false if current screen is larger than sm', () => {
        expect(isEqual(700, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if current screen is larger than md', () => {
        expect(isEqual(900, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if current screen is larger than lg', () => {
        expect(isEqual(1200, BREAKPOINT.lg)).toBeFalsy();
      });
    });

    describe('isDown', () => {
      const isDown = (screenSize: number, breakpoint: BREAKPOINT): boolean => {
        MockWindow.target.innerWidth = screenSize;
        spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
        service = TestBed.inject(BreakpointService);
        let result: boolean;
        service
          .isDown(breakpoint)
          .subscribe((br) => (result = br))
          .unsubscribe();
        return result;
      };

      it('should return true if window width < xs', () => {
        expect(isDown(500 - 1, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if window width < sm', () => {
        expect(isDown(700 - 1, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if window width < md', () => {
        expect(isDown(900 - 1, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if window width < lg', () => {
        expect(isDown(1200 - 1, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return false if window width >= xs', () => {
        expect(isDown(500, BREAKPOINT.xs)).toBeFalsy();
      });

      it('should return false if window width >= sm', () => {
        expect(isDown(700, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if window width >= md', () => {
        expect(isDown(900, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return falsy if window width >= lg', () => {
        expect(isDown(1200, BREAKPOINT.lg)).toBeFalsy();
      });
    });

    describe('isUp', () => {
      const isUp = (screenSize: number, breakpoint: BREAKPOINT): boolean => {
        MockWindow.target.innerWidth = screenSize;
        spyOnProperty(windowRef, 'resize$').and.returnValue(of(MockWindow));
        service = TestBed.inject(BreakpointService);
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

      it('should return false if window width < sm', () => {
        expect(isUp(500 - 1, BREAKPOINT.sm)).toBeFalsy();
      });

      it('should return false if window width < md', () => {
        expect(isUp(700 - 1, BREAKPOINT.md)).toBeFalsy();
      });

      it('should return false if window width < lg', () => {
        expect(isUp(900 - 1, BREAKPOINT.lg)).toBeFalsy();
      });

      it('should return false if window width < xl', () => {
        expect(isUp(1200 - 1, BREAKPOINT.xl)).toBeFalsy();
      });

      it('should return true if window width > xs', () => {
        expect(isUp(1, BREAKPOINT.xs)).toBeTruthy();
      });

      it('should return true if window width > sm', () => {
        expect(isUp(500 + 1, BREAKPOINT.sm)).toBeTruthy();
      });

      it('should return true if window width > md', () => {
        expect(isUp(700 + 1, BREAKPOINT.md)).toBeTruthy();
      });

      it('should return true if window width > lg', () => {
        expect(isUp(900 + 1, BREAKPOINT.lg)).toBeTruthy();
      });

      it('should return true if window width > xl', () => {
        expect(isUp(1200 + 1, BREAKPOINT.xl)).toBeTruthy();
      });
    });
  });
});
