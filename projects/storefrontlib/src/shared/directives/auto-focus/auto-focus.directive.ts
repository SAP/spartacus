import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[cxAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit() {
    this.hostElement.nativeElement.focus();
  }
}
