/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserRegistrationAdapter } from '@spartacus/organization/user-registration/core';
import { OccUserRegistrationAdapter } from './adapters';
import { defaultOccOrganizationUserRegistrationConfig } from './config/default-occ-organization-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrganizationUserRegistrationConfig),
    {
      provide: UserRegistrationAdapter,
      useExisting: OccUserRegistrationAdapter,
    },
  ],
})
export class UserRegistrationOccModule {}
