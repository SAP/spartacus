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
  @Input() cxNgSelect: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const divCombobox =
      this.elementRef.nativeElement.querySelector('[role="combobox"]');

    this.renderer.setAttribute(divCombobox, 'aria-label', this.cxNgSelect);
    this.renderer.setAttribute(divCombobox, 'role', 'listbox');
  }
}
