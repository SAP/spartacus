import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomChangeDirective } from './dom-change.directive';

@Component({
  template: `
    <div id="testElement" cxDomChange>
      <div class="targetElement"></div>
    </div>
  `,
  standalone: false,
})
class TestHostComponent {}

describe('DomChangeDirective', () => {
  // let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testElement: ElementRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, DomChangeDirective],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);

    testElement = fixture.debugElement.query(By.directive(DomChangeDirective));
  }));

  it('should emit when a child element is added', (done) => {
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    const newElement = document.createElement('div');

    directive.cxDomChange.subscribe((mutation: MutationRecord) => {
      expect(mutation.type).toBe('childList');
      done();
    });

    // Set DOM
    testElement.nativeElement.appendChild(newElement);
    fixture.detectChanges();
  });

  it('should emit when a child element is removed', (done) => {
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    const childElement =
      testElement.nativeElement.querySelector('.targetElement');

    directive.cxDomChange.subscribe((mutation: MutationRecord) => {
      expect(mutation.type).toBe('childList');
      done();
    });

    // Set DOM
    testElement.nativeElement.removeChild(childElement);
    fixture.detectChanges();
  });

  it('should filter mutations based on the target selector', (done) => {
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    directive.cxDomChangeTargetSelector = '.targetElement';

    directive.cxDomChange.subscribe((mutation: MutationRecord) => {
      expect(mutation.target).toHaveClass('targetElement');
      done();
    });

    // Set DOM
    const targetElement =
      testElement.nativeElement.querySelector('.targetElement');
    targetElement.appendChild(document.createTextNode('Test Text'));
    fixture.detectChanges();
  });

  it('should not emit when mutations do not match target selector', () => {
    let called = false;
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    directive.cxDomChangeTargetSelector = '.non-matching-selector';

    directive.cxDomChange.subscribe(() => {
      called = true;
    });

    // Set DOM
    const newElement = document.createElement('div');
    testElement.nativeElement.appendChild(newElement);
    fixture.detectChanges();

    expect(called).toBe(false);
  });
});
