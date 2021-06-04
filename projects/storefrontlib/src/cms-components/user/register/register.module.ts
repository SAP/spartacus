import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '../../../shared/index';
import { LoginModule } from '../login/login.module';
import { RegisterComponent } from './register.component';

/**
 * @deprecated since 3.2, use @spartacus/user package instead.
 */
@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    FormErrorsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          component: RegisterComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
