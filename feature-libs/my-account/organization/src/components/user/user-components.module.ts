import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OrganizationListModule } from '../shared/organization-list/organization-list.module';
import { UserAssignApproversModule } from './approvers/assign/user-assign-approvers.module';
import { UserApproverListModule } from './approvers/list/user-approver-list.module';
import { ChangePasswordFormModule } from './change-password-form/change-password-form.module';
import { UserChangePasswordModule } from './change-password/user-change-password.module';
import { UserCreateModule } from './create/user-create.module';
import { UserDetailsModule } from './details/user-details.module';
import { UserEditModule } from './edit/user-edit.module';
import { UserFormModule } from './form/user-form.module';
import { UserAssignPermissionsModule } from './permissions/assign/user-assign-permissions.module';
import { UserPermissionListModule } from './permissions/list/user-permission-list.module';
import { UserAssignUserGroupsModule } from './user-groups/assign/user-assign-user-groups.module';
import { UserUserGroupListModule } from './user-groups/list/user-user-group-list.module';
import {
  userCmsConfig,
  userRoutingConfig,
  userTableConfigFactory,
} from './user.config';

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

    OrganizationListModule,
  ],
  providers: [
    provideDefaultConfig(userRoutingConfig),
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
})
export class UserComponentsModule {}
