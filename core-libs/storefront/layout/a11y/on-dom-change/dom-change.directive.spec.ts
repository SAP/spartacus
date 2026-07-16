import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firstValueFrom } from 'rxjs';
import { DomChangeDirective } from './dom-change.directive';

@Component({
  template: `
    <div id="testElement" cxDomChange>
      <div class="targetElement"></div>
    </div>
  `,
  imports: [DomChangeDirective],
})
class TestHostComponent {}

describe('DomChangeDirective', () => {
  // let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testElement: ElementRef;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TestHostComponent, DomChangeDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);

    testElement = fixture.debugElement.query(By.directive(DomChangeDirective));
  });

  it('should emit when a child element is added', async () => {
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    const newElement = document.createElement('div');

    const mutationPromise = firstValueFrom(directive.cxDomChange);

    // Set DOM
    testElement.nativeElement.appendChild(newElement);
    fixture.detectChanges();

    const mutation = await mutationPromise;
    expect(mutation.type).toBe('childList');
  });

  it('should emit when a child element is removed', async () => {
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    const childElement =
      testElement.nativeElement.querySelector('.targetElement');

    const mutationPromise = firstValueFrom(directive.cxDomChange);

    // Set DOM
    testElement.nativeElement.removeChild(childElement);
    fixture.detectChanges();

    const mutation = await mutationPromise;
    expect(mutation.type).toBe('childList');
  });

  it('should filter mutations based on the target selector', async () => {
    const directive = fixture.debugElement
      .query(By.directive(DomChangeDirective))
      .injector.get(DomChangeDirective);
    directive.cxDomChangeTargetSelector = '.targetElement';

    const mutationPromise = firstValueFrom(directive.cxDomChange);

    // Set DOM
    const targetElement =
      testElement.nativeElement.querySelector('.targetElement');
    targetElement.appendChild(document.createTextNode('Test Text'));
    fixture.detectChanges();

    const mutation = await mutationPromise;
    expect(mutation.target).toHaveClass('targetElement');
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
