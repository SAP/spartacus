/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CDPUpdateProfileService } from 'integration-libs/cdp/src/lib/update-profile/cdp-update-profile.service';
import { CdcCdpUpdateProfileService } from './cdc-cdp-update-profile.service';

@NgModule({
  providers: [
    { provide: CDPUpdateProfileService, useClass: CdcCdpUpdateProfileService },
  ],
})
export class CdcCdpUpdateProfileModule {}
