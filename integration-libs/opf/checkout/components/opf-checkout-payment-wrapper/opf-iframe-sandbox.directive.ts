/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'iframe[cxOpfSandbox]',
  standalone: true,
})
export class OpfIframeSandboxDirective {
  constructor(
    protected el: ElementRef<HTMLIFrameElement>,
    protected renderer: Renderer2
  ) {}

  @Input('cxOpfSandbox') set sandboxValue(value: string | undefined) {
    if (value != null) {
      this.renderer.setAttribute(this.el.nativeElement, 'sandbox', value);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'sandbox');
    }
  }
}
