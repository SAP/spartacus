import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from 'feature-libs/user/account/components/login-form';
import { NotAuthGuard } from 'projects/core/src/auth';
import { CmsConfig } from 'projects/core/src/cms';
import { provideConfig } from 'projects/core/src/config';
import { I18nModule } from 'projects/core/src/i18n';
import { UrlModule } from 'projects/core/src/routing';
import { FormErrorsModule, SpinnerModule } from 'projects/storefrontlib/shared';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
  ],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          guards: [NotAuthGuard],
          providers: [ ...facadeProviders],
        },
      },
    })
  ],
})
export class CDCUserLoginModule {}
