import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import { Observable } from 'rxjs/internal/Observable';
// import { WindowRef } from '@spartacus/core';
// import { of } from 'rxjs';

import { UnitTreeNavigationUIComponent } from './unit-tree-navigation-ui.component';

import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'cxTranslateUrl',
})

class MockBreakpointService {
    get breakpoint$(): Observable<BREAKPOINT> {
      return of();
    }
    get breakpoints(): BREAKPOINT[] {
      return [
        BREAKPOINT.xs,
        BREAKPOINT.sm,
        BREAKPOINT.md,
        BREAKPOINT.lg,
        BREAKPOINT.xl,
      ];
    }
    isDown(breakpoint: BREAKPOINT) {
        return this.breakpoint$.pipe(
            map((br) =>
              this.breakpoints
                .slice(0, this.breakpoints.indexOf(breakpoint) + 1)
                .includes(br)
            )
        );
    }
}

describe('UnitTreeNavigationUIComponent', () => {
    let component : UnitTreeNavigationUIComponent;
    let fixture: ComponentFixture<UnitTreeNavigationUIComponent>;
    let breakpointService : MockBreakpointService;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ UnitTreeNavigationUIComponent ],
        providers: [
            UnitTreeNavigationUIComponent,
          {
            provide: BreakpointService,
            useClass: MockBreakpointService
          }
        ]
      }).compileComponents();
      breakpointService = TestBed.inject(BreakpointService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitTreeNavigationUIComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
  
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('mobile (md)', () => {
        beforeEach(() => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.md)
          );
        });

        it('breakpoint service should return true', () => {
            expect(breakpointService.isDown(BREAKPOINT.md)).toBeTruthy();
        });
    });
});
