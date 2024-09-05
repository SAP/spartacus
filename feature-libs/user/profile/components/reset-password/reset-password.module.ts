/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  RoutingService,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PasswordVisibilityToggleModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { ResetPasswordComponentService } from './reset-password-component.service';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule,
        FeaturesConfigModule,
        ResetPasswordComponent,
    ],
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                ResetPasswordComponent: {
                    component: ResetPasswordComponent,
                    guards: [NotAuthGuard],
                    providers: [
                        {
                            provide: ResetPasswordComponentService,
                            useClass: ResetPasswordComponentService,
                            deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
                        },
                    ],
                },
            },
        }),
    ],
})
export class ResetPasswordModule {}
