import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { UpdatePasswordFormComponent } from './components/update-password-form/update-password-form.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdatePasswordComponent: {
          component: UpdatePasswordComponent,
          guards: [AuthGuard],
        },
      },
    }),
    SpinnerModule,
    I18nModule,
  ],
  declarations: [UpdatePasswordComponent, UpdatePasswordFormComponent],
  exports: [UpdatePasswordComponent],
  entryComponents: [UpdatePasswordComponent],
})
export class UpdatePasswordModule {}
