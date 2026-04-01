// tokens.ts
import { inject, InjectionToken } from '@angular/core';

export const ORIGINAL_RENDERER_FACTORY = new InjectionToken(
  'OriginalRendererFactory'
);

// ============================================================
// renderers/base-href-renderer.factory.ts
// ============================================================

import { Injectable, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseHrefConfig {
  baseUrl = 'a/';
  enabled = true;
}

export function rendererFactory() {
  const renderer = inject(RendererFactory2).createRenderer(null, null);
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

@Injectable({
  providedIn: 'root',
})
export class CustomRendererService {
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private baseConfig = inject(BaseHrefConfig);

  setAttribute(
    el: any,
    name: string,
    value: string,
    namespace?: string | null | undefined
  ): void {
    // Intercept href on anchor tags
    if (
      this.baseConfig.enabled &&
      el?.tagName?.toLowerCase() === 'a' &&
      name === 'href'
    ) {
      const rewritten = this.rewriteHref(value);
      this.renderer.setAttribute(el, name, rewritten, namespace);
      return;
    }

    this.renderer.setAttribute(el, name, value, namespace);
  }

  private rewriteHref(href: string): string {
    if (!href || !this.baseConfig.baseUrl) {
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
    const base = this.baseConfig.baseUrl.replace(/\/$/, '');
    const path = href.replace(/^\//, '');
    return `${base}/${path}`;
  }
}
