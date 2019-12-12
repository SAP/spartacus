import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { Component, NgModule, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateValueAccessorModule } from './date-value-accessor.module';
import { DateValueAccessorDirective } from './date-value-accessor.directive';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

@Component({
  template: `
  <form>
    <input type="text" name="test0" [(ngModel)]="test">
    <input type="date" name="normalInput" [(ngModel)]="testDate1">
    <input type="date" name="fixedInput" [(ngModel)]="testDate2" useValueAsDate>
  </form>`
})
export class TestFormComponent {
  test: string;
  testDate1: Date;
  testDate2: Date;

  constructor() {
    this.test = 'Hello NG2';
    this.testDate1 = new Date('2016-07-22');
    this.testDate2 = new Date('2016-09-15');
  }
}

@NgModule({
  declarations: [TestFormComponent],
  imports: [FormsModule, DateValueAccessorModule],
  exports: [TestFormComponent, DateValueAccessorDirective]
})
export class DummyModule { }


function dispatchEvent(inputElement: HTMLInputElement, fixture: ComponentFixture<TestFormComponent>, text: string) {
  inputElement.value = text;
  inputElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  return fixture.whenStable();
}

describe('DateValueAccessor', () => {

  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule, DummyModule]
    });

    fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
  }));

  describe('without the "useValueAsDate" attribute', () => {

    let normalInput: DebugElement;
    beforeEach(() => normalInput = fixture.debugElement.query(By.css('input[name=normalInput]')));

    it('should NOT fix date input controls', () => {
      expect(normalInput.nativeElement.value).toBe('');
    });

    it('should populate simple strings on change', done => {
      dispatchEvent(normalInput.nativeElement, fixture, '2016-09-30').then(() => {
        // @ts-ignore
        expect(fixture.componentInstance.testDate1).toEqual('2016-09-30');
        done();
      });
    });
  });

  describe('with the "useValueAsDate" attribute', () => {

    let fixedInput: DebugElement;
    beforeEach(() => fixedInput = fixture.debugElement.query(By.css('input[name=fixedInput]')));

    it('should fix date input controls to bind on dates', () => {
      expect(fixedInput.nativeElement.value).toBe('2016-09-15');
    });

    it('should also populate dates (instead of strings) on change', done => {
      dispatchEvent(fixedInput.nativeElement, fixture, '2016-10-01').then(() => {
        expect(fixture.componentInstance.testDate2).toEqual(jasmine.any(Date));
        expect(fixture.componentInstance.testDate2).toEqual(new Date('2016-10-01'));
        done();
      });
    });
  });
});
