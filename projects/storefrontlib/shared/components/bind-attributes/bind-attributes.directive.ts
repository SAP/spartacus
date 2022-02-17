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
      target: '[role=\'combobox\']',
      attributes: {
        'aria-label': selectedLabel,
        'aria-controls': ariaControls
      }
     }"
   */
  @Input() cxBindAttributes: {
    target: string /* DOMString that matches the element to bind the attributes */;
    attributes: { [attribute: string]: any };
  };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const attributes = this.cxBindAttributes.attributes;
    const target = this.cxBindAttributes.target;

    if (attributes) {
      for (const attributeName in attributes) {
        if (attributes.hasOwnProperty(attributeName)) {
          const attributeValue = attributes[attributeName];

          if (attributeValue) {
            this.renderer.setAttribute(
              this.elementRef.nativeElement.querySelector(target) ??
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
