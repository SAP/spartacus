/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({ selector: '[cxAttributes]' })
export class AttributesDirective implements OnChanges {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  readonly cxAttributes = input<{
    [attribute: string]: any;
  }>();

  private _attributesNamePrefix: string;
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set cxAttributesNamePrefix(attributesNamePrefix: string) {
    this._attributesNamePrefix = attributesNamePrefix;
  }

  ngOnChanges(): void {
    const cxAttributes = this.cxAttributes();
    if (cxAttributes) {
      for (const attributeName in cxAttributes) {
        if (cxAttributes.hasOwnProperty(attributeName)) {
          const attributeValue = cxAttributes[attributeName];
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
