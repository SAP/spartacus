import { Directive, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Directive({
  selector: '[cxOutlet]',
})
export class TabindexDirective {
  @ViewChildren('tabindex') values: QueryList<ElementRef<HTMLElement>>;
}
