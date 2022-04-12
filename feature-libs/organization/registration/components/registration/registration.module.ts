import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    UrlModule,
    FormErrorsModule,
    SpinnerModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        RegistrationFormComponent: {
          component: RegistrationFormComponent,
        },
      },
    }),
  ],
  declarations: [RegistrationFormComponent],
  exports: [RegistrationFormComponent],
})
export class RegistrationModule {}
