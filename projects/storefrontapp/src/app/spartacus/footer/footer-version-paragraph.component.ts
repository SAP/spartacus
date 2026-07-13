/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  styles: [
    `
      app-footer-version-paragraph div {
        position: relative;
      }
      app-footer-version-paragraph .app-footer-version {
        background-color: var(--cx-color-medium);
        border-radius: 10px;
        padding: 3px 8px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
      (match) => `${match} <span class="app-footer-version">v${version}</span>`
    );
  }
}
