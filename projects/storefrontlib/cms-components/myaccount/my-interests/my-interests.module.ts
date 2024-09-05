/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';

import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { MediaModule } from '../../../shared/components/media/media.module';

import { MyInterestsComponent } from './my-interests.component';

@NgModule({
    imports: [
    CommonModule,
    I18nModule,
    ListNavigationModule,
    I18nModule,
    UrlModule,
    MediaModule,
    RouterModule.forChild([
        {
            // @ts-ignore
            path: null,
            canActivate: [AuthGuard, CmsPageGuard],
            component: PageLayoutComponent,
            data: { cxRoute: 'myInterests' },
        },
    ]),
    FeaturesConfigModule,
    MyInterestsComponent,
],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                MyInterestsComponent: {
                    component: MyInterestsComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ],
    exports: [MyInterestsComponent],
})
export class MyInterestsModule {}
