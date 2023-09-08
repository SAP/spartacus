/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { IconModule } from '../../misc/icon/icon.module';
import { NewConsentManagementComponent } from './components/new-consent-management.component';
import { ConsentManagementComponentService } from '../consent-management/consent-management-component.service';
import { NewConsentManagementFormComponent } from './components/consent-form/new-consent-management-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    IconModule,
  ],
  providers: [
    ConsentManagementComponentService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConsentManagementComponent: {
          component: NewConsentManagementComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [NewConsentManagementComponent, NewConsentManagementFormComponent],
  exports: [NewConsentManagementComponent, NewConsentManagementFormComponent],
})
export class NewConsentManagementModule {}
