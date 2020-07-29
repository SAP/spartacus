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
import { UserListModule } from './list/user-list.module';
import { UserDetailsModule } from './details/user-details.module';

import { UserAssignPermissionsModule } from './permissions/assign/user-assign-permission.module';
import { UserPermissionListModule } from './permissions/list/user-permission-list.module';

@NgModule({
  imports: [
    RouterModule,
    UserAssignPermissionsModule,
    UserPermissionListModule,
    // UserAssignApproversModule,
    // UserApproversListModule,
    // UserAssignUserGroupsModule,
    // UserUserGroupsListModule,
    UserDetailsModule,
    UserCreateModule,
    UserEditModule,
    UserFormModule,
    UserListModule,
  ],
  providers: [
    provideDefaultConfig(userRoutingConfig),
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
})
export class UserComponentsModule {}
