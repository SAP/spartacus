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


@NgModule({
    imports: [CommonModule, RouterModule, LinkComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                CMSLinkComponent: { component: LinkComponent },
            },
        }),
    ],
    exports: [LinkComponent],
})
export class LinkModule {}
