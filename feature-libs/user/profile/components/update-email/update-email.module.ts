import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UpdateEmailComponent } from './update-email.component';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    UrlModule,
    RouterModule,
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
  declarations: [UpdateEmailComponent],
})
export class UpdateEmailModule {}
