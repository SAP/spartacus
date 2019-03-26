import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfigModule, CmsConfig } from '@spartacus/core';

import { UpdateProfileComponent } from './update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: { selector: 'cx-update-profile' }
      }
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateProfileComponent],
  exports: [UpdateProfileComponent],
  entryComponents: [UpdateProfileComponent]
})
export class UpdateProfileModule {}
