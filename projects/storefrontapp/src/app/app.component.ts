/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Renderer2 } from '@angular/core';
import { BaseHrefConfig } from '@spartacus/core';
import { StorefrontComponent } from '@spartacus/storefront';

export function rendFact() {
  const renderer = inject(Renderer2);

  return renderer;
}

export function rendererFactory() {
  // const renderer = inject(RendererFactory2).createRenderer(null, null);
  const renderer = inject(Renderer2);
  const baseConfig = inject(BaseHrefConfig);

  function rewriteHref(href: string): string {
    if (!href || !baseConfig.baseUrl) {
      return href;
    }

    // Don't rewrite absolute URLs or anchors
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.startsWith('javascript:') ||
      href.startsWith('mailto:')
    ) {
      return href;
    }

    // Combine baseUrl with relative href
    const base = baseConfig.baseUrl.replace(/\/$/, '');
    const path = href.replace(/^\//, '');
    return `${base}/${path}`;
  }
  function setAttribute(
    el: any,
    name: string,
    value: string,
    namespace?: string | null | undefined
  ): void {
    // Intercept href on anchor tags
    if (
      baseConfig.enabled &&
      el?.tagName?.toLowerCase() === 'a' &&
      name === 'href'
    ) {
      const rewritten = rewriteHref(value);
      renderer.setAttribute(el, name, rewritten, namespace);
      return;
    }

    renderer.setAttribute(el, name, value, namespace);
  }

  return new Proxy(renderer, {
    get(target, prop, receiver) {
      if (prop === 'setAttribute') {
        return setAttribute;
      }

      return Reflect.get(target, prop, receiver);
    },
  });
}

/**
 * Root component that belongs to the example app, not Spartacus libraries.
 * In customers' applications, the analogical root AppComponent belongs to the custom app.
 */
@Component({
  selector: 'app-root',
  template: `<cx-storefront></cx-storefront>`,
  imports: [StorefrontComponent],
  providers: [{ provide: Renderer2, useFactory: rendererFactory }],
})
export class AppComponent {}
