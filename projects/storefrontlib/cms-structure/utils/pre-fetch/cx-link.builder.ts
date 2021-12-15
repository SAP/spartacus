import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class CxLinkBuilder {
  constructor(
    protected rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) protected document: Document,
    protected winRef: WindowRef
  ) {}

  injectPreFetch(
    attributes: Partial<{ [key in keyof HTMLLinkElement]: string }>
  ): void {
    const href = attributes.href ?? '';
    if (!this.winRef.isBrowser() || this.hasElement(href)) {
      return;
    }

    const link: HTMLLinkElement = this.document.createElement('link');
    link.rel = attributes.rel ?? 'prefetch';
    link.href = href;
    link.as = attributes.as ?? 'image';

    this.renderer.appendChild(this.document.body, link);
  }

  protected hasElement(url: string): boolean {
    return !!this.winRef.document.querySelector(`link[href="${url}"]`);
  }

  protected get renderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
