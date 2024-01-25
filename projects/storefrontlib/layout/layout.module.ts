/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { defaultLayoutConfig } from './config/default-layout.config';
import { DirectionModule } from './direction/direction.module';
import { LaunchDialogModule } from './launch-dialog/index';
import { ThemeModule } from './theme/theme.module';

@NgModule({
  imports: [
    OutletRefModule,
    LaunchDialogModule.forRoot(),
    DirectionModule,
    ThemeModule,
  ],
  providers: [provideDefaultConfig(defaultLayoutConfig)],
  exports: [OutletRefModule],
})
export class LayoutModule {}
