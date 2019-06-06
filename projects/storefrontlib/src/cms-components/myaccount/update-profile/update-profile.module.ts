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
import { UpdateProfileFormComponent } from './components/update-profile-form.component';
import { UpdateProfileComponent } from './update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: UpdateProfileComponent,
          guards: [AuthGuard],
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
  ],
  declarations: [UpdateProfileComponent, UpdateProfileFormComponent],
  exports: [UpdateProfileComponent],
  entryComponents: [UpdateProfileComponent],
})
export class UpdateProfileModule {}
