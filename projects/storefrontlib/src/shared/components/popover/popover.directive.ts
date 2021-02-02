import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[cxPopover]',
})
export class PopoverDirective implements AfterViewInit {
  @Input()
  cxPopover: any;

  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('click') onElementClick() {
    if (this.element) {
      console.log(this.element);
      console.log(this.cxPopover);
    }
  }

  ngAfterViewInit(): void {}
}
