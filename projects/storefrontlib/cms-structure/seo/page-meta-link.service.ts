import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class PageMetaLinkService {
  constructor(
    protected winRef: WindowRef,
    protected rendererFactory: RendererFactory2
  ) {}

  /**
   * Adds a canonical link element to the document head.
   *
   * If an id is provided, the link will be updated.
   * If no url is provided, the link element will be deleted.
   */
  setCanonicalLink(url: string | undefined): void {
    let link: HTMLLinkElement = this.winRef.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;

    if (!url) {
      // Removing the link is an edge case, but useful if the canonical url
      // is created in CSR while developing/testing.
      link?.remove();
      return;
    }

    if (!link) {
      link = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      this.renderer.appendChild(this.winRef.document.head, link);
    } else {
      link?.setAttribute('href', url);
    }
  }

  protected get renderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
