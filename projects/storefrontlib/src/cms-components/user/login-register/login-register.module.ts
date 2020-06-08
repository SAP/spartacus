import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
  NotAuthGuard,
} from '@spartacus/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { LoginRegisterComponent } from '../login-register/login-register.component';

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
  entryComponents: [LoginRegisterComponent],
  exports: [LoginRegisterComponent],
})
export class LoginRegisterModule {}
