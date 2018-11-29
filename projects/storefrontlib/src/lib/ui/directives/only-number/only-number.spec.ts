import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OnlyNumberDirective } from './only-number.directive';
@Component({
  template: `
    <input type="text" cxOnlyNumber value="5" />
  `
})
class TestHoverFocusComponent {}

describe('Directive: OnlyNumber', () => {
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, OnlyNumberDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new OnlyNumberDirective(inputEl);
    expect(directive).toBeTruthy();
  });

  it('should set correct value on keyup', () => {
    const event = value => ({
      key: value,
      target: { value }
    });

    inputEl.triggerEventHandler('keyup', event('3'));

    expect(inputEl.nativeElement.value).toBe('3');
    inputEl.triggerEventHandler('keyup', event('A'));

    expect(inputEl.nativeElement.value).toBe('0');
  });

  it('should set correct value on paste', () => {
    const event = {
      clipboardData: { getData: () => 'asd123' },
      preventDefault: () => {}
    };

    inputEl.triggerEventHandler('paste', event);

    expect(inputEl.nativeElement.value).toBe('123');
  });

  it('should set correct value on input', () => {
    inputEl.nativeElement.value = 'testing1341adbe$';

    inputEl.triggerEventHandler('input', null);

    expect(inputEl.nativeElement.value).toBe('1341');
  });

  it('should prevent event on keydown', () => {
    const event = value => ({
      key: value,
      target: { value },
      preventDefault: () => {}
    });

    const myEvent = event('A');
    spyOn(myEvent, 'preventDefault');
    inputEl.triggerEventHandler('keydown', myEvent);

    expect(myEvent.preventDefault).toHaveBeenCalled();
  });

  it('should prevent event on keydown', () => {
    const event = value => ({
      key: value,
      target: { value },
      preventDefault: () => {}
    });

    const myEvent = event('3');
    spyOn(myEvent, 'preventDefault');
    inputEl.triggerEventHandler('keydown', myEvent);

    expect(myEvent.preventDefault).not.toHaveBeenCalled();
  });
});
