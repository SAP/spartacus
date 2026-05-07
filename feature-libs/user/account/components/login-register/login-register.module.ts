/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeatureToggles,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfigFactory,
  UrlModule,
} from '@spartacus/core';
import { BtnLikeLinkModule, PageSlotModule } from '@spartacus/storefront';
import { LoginAsGuestGuard } from '../guards/login-as-guest.guard';
import { LoginRegisterComponent } from './login-register.component';

@Component({
  selector: 'cx-empty-login-register-cms-component',
  template: '',
})
export class EmptyLoginRegisterCmsComponent {}

export function defaultLoginRegisterComponentsConfig(): CmsConfig {
  const featureToggles = inject(FeatureToggles);

  if (!featureToggles.a11yActiveB2bLoginRegisterCpnt) {
    return {};
  }

  return {
    cmsComponents: {
      ReturningCustomerRegisterComponent: {
        component: LoginRegisterComponent,
        guards: [NotAuthGuard, LoginAsGuestGuard],
      },
      OrganizationUserRegistrationLink: {
        component: EmptyLoginRegisterCmsComponent,
      },
      NoAccountParagraphComponent: {
        component: EmptyLoginRegisterCmsComponent,
      },
    },
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    PageSlotModule,
    I18nModule,
    BtnLikeLinkModule,
    LoginRegisterComponent,
  ],
  providers: [
    provideDefaultConfigFactory(defaultLoginRegisterComponentsConfig),
  ],
})
export class LoginRegisterModule {}
