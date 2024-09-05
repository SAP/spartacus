/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';

import { ParagraphComponent } from './paragraph.component';

@NgModule({
    imports: [CommonModule, RouterModule, ParagraphComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                CMSParagraphComponent: {
                    component: ParagraphComponent,
                },
                CMSTabParagraphComponent: {
                    component: ParagraphComponent,
                },
            },
        }),
    ],
    exports: [ParagraphComponent],
})
export class CmsParagraphModule {}
