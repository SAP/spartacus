import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { ListModule } from '../shared/list/list.module';
import { UserApproverListModule } from './approvers/user-approver-list.module';
import { UserChangePasswordFormModule } from './change-password-form/user-change-password-form.module';
import { UserDetailsModule } from './details/user-details.module';
import { UserFormModule } from './form/user-form.module';
import { UserPermissionListModule } from './permissions/user-permission-list.module';
import { UserUserGroupsModule } from './user-groups/user-user-group-list.module';
import { userCmsConfig, userTableConfigFactory } from './user.config';
@NgModule({
  imports: [
    ListModule,
    UserChangePasswordFormModule,
    UserDetailsModule,
    UserFormModule,
    UserPermissionListModule,
    UserUserGroupsModule,
    UserApproverListModule,
  ],
  providers: [
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
})
export class UserComponentsModule {}
