/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { UserRegistrationConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { OrganizationUserRegistrationConflictHandler } from './http-interceptors';

@NgModule({})
export class UserRegistrationCoreModule {
  static forRoot(): ModuleWithProviders<UserRegistrationCoreModule> {
    return {
      ngModule: UserRegistrationCoreModule,
      providers: [
        ...facadeProviders,
        UserRegistrationConnector,
        {
          provide: HttpErrorHandler,
          useExisting: OrganizationUserRegistrationConflictHandler,
          multi: true,
        },
      ],
    };
  }
}
