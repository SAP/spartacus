import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PageSlotModule } from '@spartacus/storefront';
import { LoginRegisterComponent } from './login-register.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerRegisterComponent: {
          component: LoginRegisterComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [LoginRegisterComponent],
})
export class LoginRegisterModule {}
