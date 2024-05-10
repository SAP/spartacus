/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ScriptReadyNotificationService } from '../../../core/facade/script-ready-notification.service';
import { OpfCtaElementModule } from '../opf-cta-element';
import { OpfCtaScriptsComponent } from './opf-cta-scripts.component';
import { OpfCtaScriptEventBrokerService } from './services/opf-cta-scripts-event-broker.service';
import { OpfScriptIdentifierService } from './services/opf-cta-scripts-identifier.service';
import { OpfCtaScriptsService } from './services/opf-cta-scripts.service';

@NgModule({
  declarations: [OpfCtaScriptsComponent],
  providers: [
    OpfScriptIdentifierService,
    ScriptReadyNotificationService,
    OpfCtaScriptEventBrokerService,
    OpfCtaScriptsService,
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        OpfCtaScriptsComponent: {
          component: OpfCtaScriptsComponent,
        },
      },
    }),
  ],
  exports: [OpfCtaScriptsComponent],
  imports: [CommonModule, OpfCtaElementModule, SpinnerModule],
})
export class OpfCtaScriptsModule {}
