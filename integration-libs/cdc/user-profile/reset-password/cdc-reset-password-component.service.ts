/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from "@angular/core";
import { ResetPasswordComponentService } from "@spartacus/user/profile/components";

@Injectable()
export class CdcResetPasswordComponentService extends ResetPasswordComponentService{
  tokenName = 'pwrt';
}
