import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SplitViewService } from '../split-view.service';
import { SplitViewComponent } from './split-view.component';

@Injectable({ providedIn: 'root' })
class MockSplitViewService {
  getActiveView() {
    return of(5);
  }
}

describe('SplitViewComponent', () => {
  let component: SplitViewComponent;
  let fixture: ComponentFixture<SplitViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitViewComponent],
    })
      .overrideComponent(SplitViewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          providers: [
            { provide: SplitViewService, useExisting: MockSplitViewService },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind service.visibleViewCount to lastVisibleView', () => {
    fixture.detectChanges();
    expect(component.lastVisibleView).toEqual(6);
  });

  it('should bind lastVisibleView to --cx-active-view CSS property', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.style.getPropertyValue('--cx-active-view')).toEqual('6');
  });
});
