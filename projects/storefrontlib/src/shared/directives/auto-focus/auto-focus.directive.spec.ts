import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from './auto-focus.directive';
@Component({
  template: `
    <input type="text" cxAutoFocus value="mockValue" />
  `,
})
class TestHoverFocusComponent {}

describe('Directive: AutoFocus', () => {
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl;
  let directive: AutoFocusDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, AutoFocusDirective],
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    directive = new AutoFocusDirective(inputEl);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should focus after view init', () => {
    spyOn(inputEl.nativeElement, 'focus');
    directive.ngAfterViewInit();
    expect(inputEl.nativeElement.focus).toHaveBeenCalled();
  });
});
