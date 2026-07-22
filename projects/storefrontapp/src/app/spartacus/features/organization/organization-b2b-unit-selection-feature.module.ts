/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  b2bUnitSelectionTranslationChunksConfig,
  b2bUnitSelectionTranslationsEn,
} from '@spartacus/organization/b2b-unit-selection/assets';
import { B2bUnitSelectionModule } from '@spartacus/organization/b2b-unit-selection';
import { B2bUnitSelectionRootModule } from '@spartacus/organization/b2b-unit-selection/root';

/**
 * B2B Unit Selection 功能模块。
 *
 * 注意：此模块必须 eager-load（不能使用 featureModules 懒加载），
 * 因为 B2bUnitSelectionEffects 需要在应用启动时注册，
 * 以便监听 AuthActions.LOGIN 事件。
 */
@NgModule({
  imports: [
    B2bUnitSelectionRootModule,
    B2bUnitSelectionModule,
  ],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: b2bUnitSelectionTranslationsEn,
        },
        chunks: b2bUnitSelectionTranslationChunksConfig,
      },
    }),
  ],
})
export class OrganizationB2bUnitSelectionFeatureModule {}
