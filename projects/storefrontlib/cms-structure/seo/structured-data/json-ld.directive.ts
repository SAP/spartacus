/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { JsonLdScriptFactory } from './json-ld-script.factory';

/**
 * Low level directive that adds a json-ld script tag to the component.
 * This code bypasses the strict XSS security, as otherwise we're not able
 * to append a script tag with JS inside.
 *
 * This helper directive is actually not used in Spartacus, as Spartacus
 * appends json-ld the data to the document body.
 *
 * This directive can however be used by merchants to write static schema data
 * to the DOM in a save way.
 */
@Directive({
  selector: '[cxJsonLd]',
})
export class JsonLdDirective {
  /**
   * Writes the schema data to a json-ld script element.
   */
  @Input() set cxJsonLd(schema: string | {}) {
    this.generateJsonLdScript(schema);
  }

  constructor(
    protected renderer: Renderer2,
    protected jsonLdScriptFactory: JsonLdScriptFactory,
    protected element: ElementRef
  ) {}

  /**
   * attach the json-ld script tag to DOM with the schema data secured by encoding html tags (aka escaping)
   */
  protected generateJsonLdScript(schema: string | {}): void {
    if (schema && this.jsonLdScriptFactory.isJsonLdRequired()) {
      const script: HTMLScriptElement = this.renderer.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = this.jsonLdScriptFactory.escapeHtml(schema);
      this.renderer.appendChild(this.element.nativeElement, script);
    }
  }
}
