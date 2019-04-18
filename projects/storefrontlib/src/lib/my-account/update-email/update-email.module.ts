import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
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
  ],
  declarations: [UpdateEmailFormComponent, UpdateEmailComponent],
  exports: [UpdateEmailComponent],
  entryComponents: [UpdateEmailComponent],
})
export class UpdateEmailModule {}
