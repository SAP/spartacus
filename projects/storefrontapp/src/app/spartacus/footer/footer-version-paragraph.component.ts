/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ParagraphComponent,
  SupplementHashAnchorsPipe,
} from '@spartacus/storefront';
import { environment } from '../../../environments/environment';

/**
 * Matches the copyright notice rendered in the footer paragraph, e.g.
 * "Copyright © 2020 SAP SE or an SAP affiliate company. All rights reserved."
 * (the year is variable).
 */
const COPYRIGHT_NOTICE_PATTERN =
  /Copyright ©.*SAP SE or an SAP affiliate company\. All rights reserved\./;

/**
 * Example-app-only paragraph that appends the `@spartacus/core` version to the
 * footer copyright notice. It only rewrites content matching the copyright text,
 * so all other paragraphs render unchanged.
 *
 * CAUTION: This belongs to our example storefrontapp only. It is NOT meant for
 * customers' applications and is NOT shipped in any Spartacus library.
 */
@Component({
  selector: 'app-footer-version-paragraph',
  // Same template as the library's ParagraphComponent, but the content is first
  // passed through `appendVersionToNotice()`.
  template: `<div
    *ngIf="component.data$ | async as data"
    [innerHTML]="
      bypassSecurityTrustHtml(
        appendVersionToNotice(data.content) | cxSupplementHashAnchors
      )
    "
  ></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, SupplementHashAnchorsPipe],
})
export class FooterVersionParagraphComponent extends ParagraphComponent {
  appendVersionToNotice(content = ''): string {
    const version = environment.coreVersion;
    if (!version) {
      return content;
    }
    return content.replace(
      COPYRIGHT_NOTICE_PATTERN,
      (match) => `${match} v${version}`
    );
  }
}
