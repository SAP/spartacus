import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { B2BUserCreateComponent } from './b2b-user-create.component';
import { B2BUserFormModule } from '../b2b-users-form/b2b-user-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        B2BUserCreateComponent: {
          component: B2BUserCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    B2BUserFormModule,
    I18nModule,
  ],
  declarations: [B2BUserCreateComponent],
  exports: [B2BUserCreateComponent],
  entryComponents: [B2BUserCreateComponent],
})
export class B2BUserCreateModule {}
