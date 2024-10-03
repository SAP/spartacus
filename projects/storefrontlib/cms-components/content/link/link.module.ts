/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { LinkComponent } from './link.component';
import { GenericLinkModule } from '../../../shared/components/generic-link/generic-link.module';

@NgModule({
  imports: [CommonModule, RouterModule, GenericLinkModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CMSLinkComponent: { component: LinkComponent },
      },
    }),
  ],
  declarations: [LinkComponent],
  exports: [LinkComponent],
})
export class LinkModule {}
