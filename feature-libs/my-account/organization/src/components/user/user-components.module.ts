import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  userCmsConfig,
  userRoutingConfig,
  userTableConfigFactory,
} from './user.config';
import { UserCreateModule } from './create/user-create.module';
import { UserEditModule } from './edit/user-edit.module';
import { UserFormModule } from './form/user-form.module';
import { ChangePasswordFormModule } from './change-password-form/change-password-form.module';
import { UserChangePasswordModule } from './change-password/user-change-password.module';
import { UserListModule } from './list/user-list.module';
import { UserDetailsModule } from './details/user-details.module';

import { UserAssignPermissionsModule } from './permissions/assign/user-assign-permissions.module';
import { UserPermissionListModule } from './permissions/list/user-permission-list.module';
import { UserAssignApproversModule } from './approvers/assign/user-assign-approvers.module';
import { UserApproverListModule } from './approvers/list/user-approver-list.module';
import { UserAssignUserGroupsModule } from './user-groups/assign/user-assign-user-groups.module';
import { UserUserGroupListModule } from './user-groups/list/user-user-group-list.module';

@NgModule({
  imports: [
    RouterModule,
    UserAssignPermissionsModule,
    UserPermissionListModule,
    UserAssignApproversModule,
    UserApproverListModule,
    UserAssignUserGroupsModule,
    UserUserGroupListModule,
    UserDetailsModule,
    UserCreateModule,
    UserEditModule,
    UserFormModule,
    ChangePasswordFormModule,
    UserChangePasswordModule,
    UserListModule,
  ],
  providers: [
    provideDefaultConfig(userRoutingConfig),
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
})
export class UserComponentsModule {}
