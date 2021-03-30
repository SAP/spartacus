import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdatePasswordComponent: {
          component: UpdatePasswordComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [UpdatePasswordComponent, UpdatePasswordFormComponent],
  exports: [UpdatePasswordComponent, UpdatePasswordFormComponent],
  entryComponents: [UpdatePasswordComponent],
})
export class UpdatePasswordModule {}
