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
import { UpdateEmailComponent } from './update-email.component';
import { FormErrorsModule } from '../../../shared/index';
import { UpdateEmailService } from './update-email.service';
import { UpdateEmailFormService } from './update-email.form.service';

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
    UpdateEmailService,
    UpdateEmailFormService
  ],
  declarations: [UpdateEmailComponent],
  exports: [UpdateEmailComponent],
  entryComponents: [UpdateEmailComponent],
})
export class UpdateEmailModule {}
