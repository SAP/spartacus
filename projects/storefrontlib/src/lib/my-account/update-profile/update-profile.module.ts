import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { UpdateProfileFormComponent } from './components/update-profile-form.component';
import { UpdateProfileComponent } from './update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: { selector: 'cx-update-profile' },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  declarations: [UpdateProfileComponent, UpdateProfileFormComponent],
  exports: [UpdateProfileComponent],
  entryComponents: [UpdateProfileComponent],
})
export class UpdateProfileModule {}
