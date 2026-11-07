/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserIdService } from '../facade/user-id.service';
import { MockUserIdService } from './mock-user-id.service';

/** Provides a default {@link MockUserIdService} for {@link UserIdService}. */
@NgModule({
  providers: [{ provide: UserIdService, useClass: MockUserIdService }],
})
export class UserIdTestingModule {}
