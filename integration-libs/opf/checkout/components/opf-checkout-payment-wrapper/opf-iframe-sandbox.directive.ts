/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: 'iframe[cxOpfSandbox]',
})
export class OpfIframeSandboxDirective {
  protected el = inject<ElementRef<HTMLIFrameElement>>(ElementRef);
  protected renderer = inject(Renderer2);

  @Input('cxOpfSandbox') set sandboxValue(value: string | undefined) {
    if (value == null) {
      this.renderer.removeAttribute(this.el.nativeElement, 'sandbox');
    } else {
      this.renderer.setAttribute(this.el.nativeElement, 'sandbox', value);
    }
  }
}
