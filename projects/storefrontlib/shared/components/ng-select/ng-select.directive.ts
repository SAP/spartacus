import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[cxNgSelect]',
})
export class NgSelectDirective implements AfterViewInit {
  /**
   * Use directive to bind aria attribute to inner element of ng-select
   * Angular component for accessibility compliance.
   */
  @Input() cxNgSelect: { ariaLabel: string; ariaControls: string };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const divCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');

    this.renderer.setAttribute(
      divCombobox,
      'aria-label',
      this.cxNgSelect.ariaLabel
    );
    this.renderer.setAttribute(
      divCombobox,
      'aria-controls',
      this.cxNgSelect.ariaControls
    );
  }
}
