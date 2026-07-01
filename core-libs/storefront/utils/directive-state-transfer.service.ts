/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, RendererFactory2 } from '@angular/core';

/**
 * Utility class to set and retrieve transfer state between SSR and CSR for directives.
 *
 * This is useful for when a singleton state key through TransferStateService isn's sufficient.
 *
 * Note: Supports only string transfer.
 */
@Injectable({ providedIn: 'root' })
export class DirectiveStateTransferService {
  protected rendererFactory = inject(RendererFactory2);
  protected renderer2 = this.rendererFactory.createRenderer(null, null);

  set(el: HTMLElement, key: string, value: string): void {
    this.renderer2.setAttribute(el, this.attributeFrom(key), value);
  }

  get(el: HTMLElement, key: string): string | undefined {
    return el.getAttribute(this.attributeFrom(key)) ?? undefined;
  }

  clear(el: HTMLElement, key: string): void {
    this.renderer2.removeAttribute(el, this.attributeFrom(key));
  }

  protected attributeFrom(key: string): string {
    return `data-${key}`;
  }
}
