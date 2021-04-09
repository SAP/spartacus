import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { ResetPasswordComponentService } from './reset-password-component.service';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ResetPasswordComponent: {
          component: ResetPasswordComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: ResetPasswordComponentService,
              useClass: ResetPasswordComponentService,
              deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
            },
          ],
        },
      },
    }),
  ],
  declarations: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
