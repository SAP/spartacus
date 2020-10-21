import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OrganizationListModule } from '../shared/organization-list/organization-list.module';
import { UserApproverListModule } from './approvers/user-approver-list.module';
import { ChangePasswordFormModule } from './change-password-form/change-password-form.module';
import { UserDetailsModule } from './details/user-details.module';
import { UserFormModule } from './form/user-form.module';
import { UserPermissionListModule } from './permissions/user-permission-list.module';
import { UserUserGroupsModule } from './user-groups/user-user-group-list.module';
import {
  userCmsConfig,
  userRoutingConfig,
  userTableConfigFactory,
} from './user.config';
@NgModule({
  imports: [
    OrganizationListModule,
    ChangePasswordFormModule,
    UserDetailsModule,
    UserFormModule,
    UserPermissionListModule,
    UserUserGroupsModule,
    UserApproverListModule,
  ],
  providers: [
    provideDefaultConfig(userRoutingConfig),
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
})
export class UserComponentsModule {}
