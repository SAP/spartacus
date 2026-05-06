import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusOnInitDirective } from './focus-on-init.directive';

@Component({
  template: '<h2 cxFocusOnInit>Title</h2>',
  imports: [FocusOnInitDirective],
})
class TestComponent {}

describe('FocusOnInitDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should set tabindex="-1" on the host element', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(FocusOnInitDirective));
    expect(el.nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should focus the host element after view init', fakeAsync(() => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(
      By.directive(FocusOnInitDirective)
    ).nativeElement;
    spyOn(el, 'focus').and.callThrough();

    tick();

    expect(document.activeElement).toBe(el);
  }));

  it('should allow tabindex to be overridden in the template', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [OverriddenTabIndexComponent],
    }).compileComponents();

    const overrideFixture = TestBed.createComponent(
      OverriddenTabIndexComponent
    );
    overrideFixture.detectChanges();

    const el = overrideFixture.debugElement.query(
      By.directive(FocusOnInitDirective)
    );
    expect(el.nativeElement.getAttribute('tabindex')).toBe('0');
  });
});

@Component({
  template: '<h2 cxFocusOnInit tabindex="0">Title</h2>',
  imports: [FocusOnInitDirective],
})
class OverriddenTabIndexComponent {}
