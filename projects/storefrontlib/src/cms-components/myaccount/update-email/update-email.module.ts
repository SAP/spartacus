import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { UpdateEmailFormComponent } from './update-email-form/update-email-form.component';
import { UpdateEmailComponent } from './update-email.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateEmailComponent: {
          selector: 'cx-update-email',
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
  ],
  declarations: [UpdateEmailFormComponent, UpdateEmailComponent],
  exports: [UpdateEmailComponent],
  entryComponents: [UpdateEmailComponent],
})
export class UpdateEmailModule {}
