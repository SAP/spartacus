/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { QualtricsEmbeddedFeedbackComponent } from './qualtrics-embedded-feedback/qualtrics-embedded-feedback.component';
import { defaultQualtricsConfig } from './qualtrics-loader/config/default-qualtrics-config';
import { QualtricsComponent } from './qualtrics-loader/qualtrics.component';

@NgModule({
    imports: [CommonModule, QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                QualtricsEmbeddedFeedbackComponent: {
                    component: QualtricsEmbeddedFeedbackComponent,
                },
                QualtricsComponent: {
                    component: QualtricsComponent,
                },
            },
        }),
        provideDefaultConfig(defaultQualtricsConfig),
    ],
    exports: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
})
export class QualtricsComponentsModule {}
