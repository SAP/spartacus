import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[cxBindAttributes]',
})
export class BindAttributesDirective implements AfterViewInit {
  /**
   * Usage:
   * [cxBindAttributes]="{
      'aria-label': selectedLabel,
      'aria-controls': ariaControls
     }"
   */
  @Input() cxBindAttributes: { [attribute: string]: any };

  /* DOMString that matches the element to bind the attributes */
  @Input() target: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.cxBindAttributes) {
      for (const attributeName in this.cxBindAttributes) {
        if (this.cxBindAttributes.hasOwnProperty(attributeName)) {
          const attributeValue = this.cxBindAttributes[attributeName];
          if (attributeValue) {
            this.renderer.setAttribute(
              this.elementRef.nativeElement.querySelector(this.target) ??
                this.elementRef.nativeElement,
              attributeName,
              attributeValue
            );
          }
        }
      }
    }
  }
}
