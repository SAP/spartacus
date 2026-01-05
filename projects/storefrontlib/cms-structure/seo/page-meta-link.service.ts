/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PageMetaLinkService {
  protected document: Document = inject(DOCUMENT);

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

  addPreconnectLink(url: string): void {
    // Check if a preconnect link with the same href already exists
    const existing = this.document.head.querySelector(
      `link[rel="preconnect"][href="${url}"]`
    );
    if (existing) {
      return; // Preconnect link already exists, do nothing
    }
    const preconnect = this.renderer.createElement('link');
    this.renderer.setAttribute(preconnect, 'rel', 'preconnect');
    this.renderer.setAttribute(preconnect, 'href', url);
    this.document.head.insertBefore(preconnect, this.document.head.firstChild); // we want the preconnect-link to be at the top of the <head> section
  }

  protected get renderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
