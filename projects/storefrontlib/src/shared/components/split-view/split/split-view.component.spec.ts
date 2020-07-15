import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SplitViewService } from '../split-view.service';
import { SplitViewComponent } from './split-view.component';

const VALUE_FIVE = 5;

@Injectable()
class MockSplitViewService {
  visibleViewCount() {
    return of(VALUE_FIVE);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind service.visibleViewCount to lastVisibleView', () => {
    fixture.detectChanges();
    expect(component.lastVisibleView).toEqual(VALUE_FIVE);
  });

  it('should bind lastVisibleView to --cx-last-visible-view CSS property', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.style.getPropertyValue('--cx-last-visible-view')).toEqual('5');
  });
});
