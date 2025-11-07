/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import { Injectable, isDevMode, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { SeoConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class JsonLdScriptFactory {
  protected platformId = inject(PLATFORM_ID);
  protected winRef = inject(WindowRef);
  protected rendererFactory = inject(RendererFactory2);
  protected config = inject(SeoConfig);

  protected renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );

  build(schema: {}[]): void {
    if (schema && this.isJsonLdRequired()) {
      this.getJsonLdScriptElement().textContent = this.escapeHtml(schema);
    }
  }

  /**
   * Indicates whether json ld data should be generated.
   *
   * This is only required on the server, but can be enabled in dev mode.
   */
  isJsonLdRequired(): boolean {
    return (
      !isPlatformBrowser(this.platformId) ||
      (isDevMode() && !this.config.seo?.structuredData?.disableInDevMode)
    );
  }

  /**
   * Creates a json-ld script element. The element is created one, and appended
   * to the html body element.
   *
   * ```html
   * <script id="json-ld" type="application/ld+json">
   * </script>
   * ```
   */
  protected getJsonLdScriptElement(): HTMLScriptElement {
    const id = 'json-ld';
    let scriptElement: HTMLScriptElement = <HTMLScriptElement>(
      this.winRef.document.getElementById(id)
    );

    if (!scriptElement) {
      const script: HTMLScriptElement = this.renderer.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.renderer.appendChild(this.winRef.document.body, script);
      scriptElement = script;
    }
    return scriptElement;
  }

  /**
   * Secure the given json-ld schema by encoding html characters (aka escaping), eg: <script> becomes &lt;script&gt;
   *
   * The given schema is not trusted, as malicious code could be injected (XSS)
   * into the json-ld script.
   */
  escapeHtml(schema: {}): string {
    const div: HTMLScriptElement = this.renderer.createElement('div');
    div.textContent = JSON.stringify(schema);
    return div.innerHTML;
  }
}
