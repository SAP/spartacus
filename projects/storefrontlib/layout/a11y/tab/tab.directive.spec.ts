import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabDirective } from './tab.directive';

describe('TabDirective', () => {
  @Component({
    selector: 'cx-test-component',
    template: ` <div cxTab></div> `,
  })
  class TestComponent {
    @ViewChild(TabDirective)
    directive: TabDirective;
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabDirective, TestComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update HTML attributes', () => {
    component.directive.ariaSelected = true;
    component.directive.tabindex = -1;

    fixture.detectChanges();

    component.directive.focus();

    const debugElement = fixture.debugElement;
    const element: HTMLElement = debugElement.nativeElement;
    const div = element.children.item(0);

    expect(div?.attributes.getNamedItem('aria-selected')?.value).toBe('true');
    expect(div?.attributes.getNamedItem('tabindex')?.value).toBe('-1');
  });
});
