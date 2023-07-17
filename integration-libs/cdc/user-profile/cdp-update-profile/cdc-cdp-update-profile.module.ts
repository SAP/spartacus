/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CDPUpdateProfileService } from '@spartacus/cdp/user-profile';
import { CdcCdpUpdateProfileService } from './cdc-cdp-update-profile.service';

@NgModule({
  providers: [
    { provide: CDPUpdateProfileService, useClass: CdcCdpUpdateProfileService },
  ],
})
export class CdcCdpUpdateProfileModule {}
