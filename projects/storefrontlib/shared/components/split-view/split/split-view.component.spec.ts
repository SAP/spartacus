import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { BREAKPOINT, BreakpointService } from '../../../../layout';
import { SplitViewService } from '../split-view.service';
import { SplitViewComponent } from './split-view.component';
import createSpy = jasmine.createSpy;

@Injectable()
class MockSplitViewService {
  updateSplitView = createSpy('updateSplitView');
  getActiveView() {
    return EMPTY;
  }
}

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return EMPTY;
  }
}

describe('SplitViewComponent', () => {
  let component: SplitViewComponent;
  let fixture: ComponentFixture<SplitViewComponent>;
  let breakpointService: BreakpointService;
  let splitViewService: SplitViewService;

  beforeEach(() => {
    console.log('Starting SplitViewComponent test');
    TestBed.configureTestingModule({
      declarations: [SplitViewComponent],
      providers: [
        { provide: BreakpointService, useClass: MockBreakpointService },
      ],
    })
      .overrideComponent(SplitViewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          providers: [
            { provide: SplitViewService, useClass: MockSplitViewService },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    console.log('Starting SplitViewComponent test');
    fixture = TestBed.createComponent(SplitViewComponent);
    component = fixture.componentInstance;
    breakpointService = TestBed.inject(BreakpointService);

    splitViewService = fixture.debugElement.injector.get(SplitViewService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind service.visibleViewCount to lastVisibleView', () => {
    spyOn(splitViewService, 'getActiveView').and.returnValue(of(5));
    fixture.detectChanges();
    expect(component.lastVisibleView).toEqual(6);
  });

  it('should bind lastVisibleView to --cx-active-view CSS property', () => {
    spyOn(splitViewService, 'getActiveView').and.returnValue(of(3));
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.style.getPropertyValue('--cx-active-view')).toEqual('4');
  });

  it('should update splitViewService when screen changes to xs', () => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      of(BREAKPOINT.xs)
    );
    fixture.detectChanges();
    expect(splitViewService.updateSplitView).toHaveBeenCalled();
  });
});
