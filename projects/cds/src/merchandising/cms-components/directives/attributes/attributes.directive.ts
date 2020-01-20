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
  @Input() cxAttributes: Map<string, string>;

  private _attributesNamePrefix: string;
  @Input() set cxAttributesNamePrefix(attributesNamePrefix: string) {
    this._attributesNamePrefix = attributesNamePrefix;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (this.cxAttributes) {
      this.cxAttributes.forEach(
        (attributeValue: string, attributeName: string) => {
          if (attributeName && attributeValue) {
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
      );
    }
  }
}
