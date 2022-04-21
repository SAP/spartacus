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
import {
  FormErrorsModule,
  SpinnerModule,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { NgSelectModule } from '@ng-select/ng-select';
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
    NgSelectModule,
    NgSelectA11yModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        RegisterOrgUserComponent: {
          component: RegistrationFormComponent,
        },
      },
    }),
  ],
  declarations: [RegistrationFormComponent],
  exports: [RegistrationFormComponent],
})
export class RegistrationModule {}
