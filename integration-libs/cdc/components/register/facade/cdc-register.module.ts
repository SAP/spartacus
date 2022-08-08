import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  CmsConfig,
  CommandService,
  GlobalMessageService,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yModule,
  SpinnerModule,
} from '@spartacus/storefront';
import {
  RegisterComponent,
  RegisterComponentService,
} from '@spartacus/user/profile/components';
import { UserRegisterFacade } from '@spartacus/user/profile/root';
import { CDCRegisterComponentService } from './cdc-register-component.service';

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
          providers: [
            {
              provide: RegisterComponentService,
              useClass: CDCRegisterComponentService,
              deps: [
                UserRegisterFacade,
                CommandService,
                Store,
                CdcJsService,
                GlobalMessageService,
              ],
            },
          ],
        },
      },
    }),
  ],
})
export class CDCRegisterModule {}
