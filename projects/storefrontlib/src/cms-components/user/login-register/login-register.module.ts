import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  FeaturesConfigModule,
  provideDefaultConfig,
  UrlModule,
  NotAuthGuard,
  CheckoutModule,
} from '@spartacus/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { LoginRegisterComponent } from './login-register.component';

@NgModule({
  imports: [
    FeaturesConfigModule,
    CommonModule,
    RouterModule,
    UrlModule,
    PageSlotModule,
    I18nModule,
    CheckoutModule,
  ],
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
