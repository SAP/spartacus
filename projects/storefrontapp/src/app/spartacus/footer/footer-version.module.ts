/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { FooterVersionParagraphComponent } from './footer-version-paragraph.component';

/**
 * Example-app-only module that overrides the paragraph CMS mapping so the footer
 * copyright notice gets the `@spartacus/core` version appended.
 *
 * CAUTION: This belongs to our example storefrontapp only. It is NOT meant for
 * customers' applications and is NOT shipped in any Spartacus library.
 */
@NgModule({
  imports: [FooterVersionParagraphComponent],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        CMSParagraphComponent: {
          component: FooterVersionParagraphComponent,
        },
      },
    }),
  ],
})
export class FooterVersionModule {}
