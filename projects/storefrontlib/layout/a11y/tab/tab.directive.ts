import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[cxTab]',
})
export class TabDirective {
  @HostBinding('attr.aria-selected')
  ariaSelected: boolean;

  @HostBinding('attr.tabindex')
  tabindex: 0 | -1;

  constructor(protected elementRef: ElementRef<HTMLElement>) {}

  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
