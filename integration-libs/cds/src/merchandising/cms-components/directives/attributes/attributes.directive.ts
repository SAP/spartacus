/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[cxAttributes]',
  standalone: false,
})
export class AttributesDirective implements OnChanges {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  @Input() cxAttributes: { [attribute: string]: any };

  private _attributesNamePrefix: string;
  @Input() set cxAttributesNamePrefix(attributesNamePrefix: string) {
    this._attributesNamePrefix = attributesNamePrefix;
  }

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
