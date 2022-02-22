import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cxNgSelect]',
})
export class NgSelectDirective implements AfterViewInit {
  protected target = "[role='combobox']";

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement.querySelector(this.target),
      'role',
      'listbox'
    );
    this.renderer.setAttribute(
      this.elementRef.nativeElement.querySelector(this.target),
      'tabindex',
      '0'
    );
  }
}
