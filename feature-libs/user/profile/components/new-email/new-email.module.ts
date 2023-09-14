/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  AuthRedirectService,
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  SpinnerModule,
  PasswordVisibilityToggleModule,
  MessageComponentModule,
} from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { NewEmailComponentService } from './new-email-component.service';
import { NewEmailComponent } from './new-email.component';

@NgModule({
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                NewEmailComponent: {
                    component: NewEmailComponent,
                    guards: [AuthGuard],
                    providers: [
                        {
                            provide: NewEmailComponentService,
                            useClass: NewEmailComponentService,
                            deps: [
                                UserEmailFacade,
                                RoutingService,
                                GlobalMessageService,
                                AuthService,
                                AuthRedirectService,
                            ],
                        },
                    ],
                },
            },
        }),
    ],
    declarations: [NewEmailComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        UrlModule,
        RouterModule,
        I18nModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        MessageComponentModule,
    ]
})
export class NewEmailModule {}
