import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[cxAttributes]',
})
export class AttributesDirective implements OnChanges {
  @Input() cxAttributes: { [attribute: string]: any };

  private _attributesNamePrefix: string;
  @Input() set cxAttributesNamePrefix(attributesNamePrefix: string) {
    this._attributesNamePrefix = attributesNamePrefix;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (this.cxAttributes) {
      for (const attributeName in this.cxAttributes) {
        if (this.cxAttributes.hasOwnProperty(attributeName)) {
          const attributeValue = this.cxAttributes[attributeName];
          if (attributeValue) {
            const _attributeName = this._attributesNamePrefix
              ? `${this._attributesNamePrefix}-${attributeName}`
              : attributeName;
            this.renderer.setAttribute(
              this.elementRef.nativeElement,
              _attributeName,
              attributeValue
            );
          }
        }
      }
    }
  }
}
