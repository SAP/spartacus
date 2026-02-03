import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorMainAriaLabelledByDirective } from './configurator-product-title.directive';

@Component({
  template: `<main></main>
    <span id="test" [cxConfiguratorMainAriaLabelledBy]="'test'"></span>`,
  imports: [ConfiguratorMainAriaLabelledByDirective],
})
class TestComponent {}

describe('ConfiguratorMainAriaLabelledByDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let mainEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorMainAriaLabelledByDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    mainEl = fixture.nativeElement.querySelector('main');
  });

  it('should set aria-labelledby on <main> on init', () => {
    expect(mainEl.getAttribute('aria-labelledby')).toBe('test');
  });

  it('should remove aria-labelledby from <main> on destroy', () => {
    fixture.destroy();
    expect(mainEl.hasAttribute('aria-labelledby')).toBe(false);
  });
});
