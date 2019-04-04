import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdatePasswordComponent: { selector: 'cx-update-password' },
      },
    }),
  ],
  declarations: [UpdatePasswordComponent],
  exports: [UpdatePasswordComponent],
  entryComponents: [UpdatePasswordComponent],
})
export class UpdatePasswordModule {}
