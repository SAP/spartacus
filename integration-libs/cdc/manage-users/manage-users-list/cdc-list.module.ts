/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { CdcListComponent } from './cdc-list.component';
import { PopoverModule } from '@spartacus/storefront';
import { MessageModule } from '@spartacus/organization/administration/components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SplitViewModule,
    TableModule,
    IconModule,
    UrlModule,
    I18nModule,
    PaginationModule,
    NgSelectModule,
    FormsModule,
    MessageModule,
    KeyboardFocusModule,
    PopoverModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ManageUsersListComponent: {
          component: CdcListComponent,
        },
      },
    }),
  ],
  declarations: [CdcListComponent],
  exports: [CdcListComponent],
})
export class CdcListModule {}
