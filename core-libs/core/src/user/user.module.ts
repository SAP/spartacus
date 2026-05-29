/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config-providers';
import { defaultHierarchicalAddressConfig } from './config/default-hierarchical-address-config';
import { UserEventBuilder } from './events/user-event.builder';
import { UserEventModule } from './events/user-event.module';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserStoreModule, UserEventModule],
  providers: [UserEventBuilder],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [provideDefaultConfig(defaultHierarchicalAddressConfig)],
    };
  }
}
