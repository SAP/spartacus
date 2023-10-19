/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'cx-opf-cta-button',
  templateUrl: './opf-cta-button.component.html',
})
export class OpfCtaButtonComponent {
  protected sanitizer = inject(DomSanitizer);

  @Input() ctaScriptHtml: string;

  renderHtml(html?: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html as string);
  }
}
