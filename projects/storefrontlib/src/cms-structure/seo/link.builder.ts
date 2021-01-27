import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class LinkBuilder {
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
  addCanonicalLink(url: string): void {
    const elId = 'cxCanonical';
    if (elId && !url) {
      this.removeLink(elId);
      return;
    }

    if (!this.winRef.document?.getElementById(elId)) {
      const link = this.renderer.createElement('link');
      link.rel = 'canonical';
      link.id = elId;
      link.href = url;
      this.renderer.appendChild(this.winRef.document.head, link);
    } else {
      this.winRef.document?.getElementById(elId).setAttribute('href', url);
    }
  }

  /**
   * Removing the link is an edge case, but useful if the canonical url
   * is created in CSR while developing/testing.
   */
  protected removeLink(elId: string) {
    this.winRef.document?.getElementById(elId)?.remove();
  }

  protected get renderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
