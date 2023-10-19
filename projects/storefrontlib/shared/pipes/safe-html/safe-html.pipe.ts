/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/*
 * Pipe for bypassing security trust html
 */
@Pipe({ name: 'cxSafeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(html: string = ''): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
