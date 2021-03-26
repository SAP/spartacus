import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UpdatePasswordComponent } from './update-password.component';
import { UpdatePasswordService } from './update-password.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
    UrlModule,
    RouterModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UpdatePasswordComponent: {
          component: UpdatePasswordComponent,
          guards: [AuthGuard],
          providers: [
            {
              provide: UpdatePasswordService,
              useClass: UpdatePasswordService,
              deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
            },
          ],
        },
      },
    }),
  ],
  declarations: [UpdatePasswordComponent],
})
export class UpdatePasswordModule {}
