import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

/**
 * Reusable directive to focus the host element whenever the `esccape` key
 * is captured. The directive can be used on a tree of elements. Since
 * UiEvents bubble up by nature, the directive will have effect as long as
 * the upper `cxEscGroup` is reached.
 */
@Directive({
  selector: '[cxEscGroup]',
})
export class EscGroupDirective {
  @HostBinding('tabIndex') tabIndex = 0;

  @HostListener('keydown.escape', ['$event'])
  protected onEscape = (event: KeyboardEvent) => {
    if (!this.isFocussed) {
      this.elementRef.nativeElement.focus();

      event.preventDefault();
      event.stopPropagation();
    }
  };

  constructor(private elementRef: ElementRef) {}

  private get isFocussed() {
    return this.elementRef.nativeElement === document.activeElement;
  }
}
