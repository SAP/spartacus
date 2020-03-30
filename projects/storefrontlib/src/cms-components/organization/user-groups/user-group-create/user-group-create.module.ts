import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UserGroupCreateComponent } from './user-group-create.component';
import { UserGroupFormModule } from '../user-group-form/user-group-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UserGroupCreateComponent: {
          component: UserGroupCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UserGroupFormModule,
    I18nModule,
  ],
  declarations: [UserGroupCreateComponent],
  exports: [UserGroupCreateComponent],
  entryComponents: [UserGroupCreateComponent],
})
export class UserGroupCreateModule {}
