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
import { FormErrorsModule } from '../../../shared/index';
import { UpdateEmailFormComponent } from './update-email-form/update-email-form.component';
import { UpdateEmailComponent } from './update-email.component';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
// TODO (#11607) remove Module
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
        UpdateEmailComponent: {
          component: UpdateEmailComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  declarations: [UpdateEmailFormComponent, UpdateEmailComponent],
  exports: [UpdateEmailComponent, UpdateEmailFormComponent],
  entryComponents: [UpdateEmailComponent],
})
export class UpdateEmailModule {}
