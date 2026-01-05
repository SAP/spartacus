/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CxErrorHandlerEffect } from './cx-error-handler.effect';
import { ErrorActionService } from './error-action.service';

@NgModule({
  imports: [EffectsModule.forFeature([CxErrorHandlerEffect])],
})
export class EffectsErrorHandlerModule {
  static forRoot(): ModuleWithProviders<EffectsErrorHandlerModule> {
    return {
      ngModule: EffectsErrorHandlerModule,
      providers: [ErrorActionService],
    };
  }
}
