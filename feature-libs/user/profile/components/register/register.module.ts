import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { RegisterComponentService } from './register-component.service';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SpinnerModule,
    FormErrorsModule,
    NgSelectModule,
    NgSelectA11yModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RegisterCustomerComponent: {
          component: RegisterComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: UserRegisterFacade,
              useExisting: RegisterComponentService,
            },
          ],
        },
      },
    }),
  ],
  declarations: [RegisterComponent],
})
export class RegisterComponentModule {}
