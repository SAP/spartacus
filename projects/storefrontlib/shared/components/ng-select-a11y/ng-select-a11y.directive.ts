import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[cxNgSelectA11y]',
})
export class NgSelectA11yDirective implements AfterViewInit {
  /**
   * Use directive to bind aria attribute to inner element of ng-select
   * Angular component for accessibility compliance.
   */
  @Input() cxNgSelectA11y: { ariaLabel: string; ariaControls: string };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const divCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');

    this.renderer.setAttribute(
      divCombobox,
      'aria-label',
      this.cxNgSelectA11y.ariaLabel
    );
    this.renderer.setAttribute(
      divCombobox,
      'aria-controls',
      this.cxNgSelectA11y.ariaControls
    );
  }
}
