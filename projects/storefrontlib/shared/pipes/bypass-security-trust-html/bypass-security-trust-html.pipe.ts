/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/*
 * Converts the provided HTML string into SafeHtml using Angular’s DomSanitizer,
 * allowing HTML content — normally blocked for security reasons — to be safely
 * rendered in the template (e.g., CMS-provided content used with [innerHTML]).
 *
 * Note: this pipe only bypasses Angular’s built-in security checks;
 * it does **not** sanitize or modify the HTML. Use it only when the input
 * content is trusted.
 */
@Pipe({
  name: 'cxBypassSecurityTrustHtml',
  standalone: false,
})
export class BypassSecurityTrustHtmlPipe implements PipeTransform {
  protected sanitizer = inject(DomSanitizer);

  public transform(html: string = ''): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
