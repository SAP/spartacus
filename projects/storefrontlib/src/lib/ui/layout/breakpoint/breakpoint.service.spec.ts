import { TestBed, inject } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { BreakpointService } from './breakpoint.service';
import { LayoutConfig, BREAKPOINT } from '../config/layout-config';

const MockLayoutConfig: LayoutConfig = {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

const MockWindowRef = {
  nativeWindow: {
    innerWidth: 1000
  }
};

describe('BreakpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: LayoutConfig, useValue: MockLayoutConfig },
        BreakpointService
      ]
    });
  });

  it('should be created', inject(
    [BreakpointService],
    (service: BreakpointService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should support 5 breakpoints', inject(
    [BreakpointService],
    (service: BreakpointService) => {
      expect(service.breakpoints).toEqual([
        BREAKPOINT.xs,
        BREAKPOINT.sm,
        BREAKPOINT.md,
        BREAKPOINT.lg,
        BREAKPOINT.xl
      ]);
    }
  ));
});
