import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatePickerFallbackDirective } from './date-picker-fallback.directive';

@Component({
  selector: 'cx-mock',
  template: ` <input type="date" cxDatePickerFallback />`,
})
class MockComponent {}

describe('DatePickerFallbackDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let el: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerFallbackDirective, MockComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;

    el = fixture.debugElement.query(By.directive(DatePickerFallbackDirective))
      .nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add placeholder', () => {
    expect(el.getAttribute('placeholder')).toEqual('yyyy-mm-dd');
  });

  it('should add pattern', () => {
    expect(el.getAttribute('pattern')).toEqual('\\d{4}-\\d{1,2}-\\d{1,2}');
  });
});
