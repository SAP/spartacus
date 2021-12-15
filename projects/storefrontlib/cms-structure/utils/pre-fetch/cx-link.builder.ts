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
    url: string,
    type: 'document' | 'script' | 'style' | 'font' | 'image'
  ): void {
    if (!this.winRef.isBrowser() || this.hasElement(url)) {
      return;
    }

    const link: HTMLLinkElement = this.document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = type;

    this.renderer.appendChild(this.document.body, link);
  }

  protected hasElement(url: string): boolean {
    return !!this.winRef.document.querySelector(`link[href="${url}"]`);
  }

  protected get renderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
