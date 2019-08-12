import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  NotAuthGuard,
  UrlModule,
} from '@spartacus/core';
import { LoginModule } from '../login/login.module';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          component: RegisterComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
    I18nModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  entryComponents: [RegisterComponent],
})
export class RegisterComponentModule {}
