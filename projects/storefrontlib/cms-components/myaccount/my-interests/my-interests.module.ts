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
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { AtMessageModule } from '../../../shared/components/assistive-technology-message/assistive-technology-message.module';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { MediaModule } from '../../../shared/components/media/media.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { MyInterestsComponent } from './my-interests.component';

@NgModule({
  declarations: [MyInterestsComponent],
  imports: [
    AtMessageModule,
    CommonModule,
    I18nModule,
    ListNavigationModule,
    I18nModule,
    UrlModule,
    MediaModule,
    SpinnerModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'myInterests' },
      },
    ]),
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
