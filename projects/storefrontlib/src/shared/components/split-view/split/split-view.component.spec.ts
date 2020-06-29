import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SplitViewService } from '../split-view.service';
import { SplitViewComponent } from './split-view.component';

class MockSplitViewService {
  visibleViewCount() {
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
            { provide: SplitViewService, useClass: MockSplitViewService },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default value for lastVisibleView', () => {
    expect(component.lastVisibleView).toEqual(1);
  });

  it('should bind service.visibleViewCount to lastVisibleView', () => {
    expect(component.lastVisibleView).toEqual(5);
  });

  it('should bind lastVisibleView to --cx-last-visible-view CSS property', () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.style.getPropertyValue('--cx-last-visible-view')).toEqual('5');
  });
});
