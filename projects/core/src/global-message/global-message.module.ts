/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  errorHandlers,
  httpErrorInterceptors,
} from './http-interceptors/index';
import { GlobalMessageStoreModule } from './store/global-message-store.module';
import { GlobalMessageEffect } from './store/effects/global-message.effect';

import { defaultGlobalMessageConfig } from './config/default-global-message-config';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [
    GlobalMessageStoreModule,
    EffectsModule.forFeature([GlobalMessageEffect]),
  ],
  providers: [provideDefaultConfig(defaultGlobalMessageConfig)],
})
export class GlobalMessageModule {
  static forRoot(): ModuleWithProviders<GlobalMessageModule> {
    return {
      ngModule: GlobalMessageModule,
      providers: [...errorHandlers, ...httpErrorInterceptors],
    };
  }
}
