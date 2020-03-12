import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { SpinnerModule } from '../../../shared/index';
import { LoginModule } from '../login/login.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          component: RegisterComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  entryComponents: [RegisterComponent],
})
export class RegisterComponentModule {}
