import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  userGroupCmsConfig,
  userGroupRoutingConfig,
  userGroupTableConfigFactory,
} from './user-group.config';
import { UserGroupCreateModule } from './create/user-group-create.module';
import { UserGroupEditModule } from './edit/user-group-edit.module';
import { UserGroupFormModule } from './form/user-group-form.module';
import { UserGroupListModule } from './list/user-group-list.module';
import { UserGroupAssignUserModule } from './users/assign/user-group-assign-user.module';
import { UserGroupUserListModule } from './users/list/user-group-user-list.module';
import { UserGroupAssignPermissionModule } from './permissions/assign/user-group-assign-permission.module';
import { UserGroupPermissionListModule } from './permissions/list/user-group-permission-list.module';
import { UserGroupDetailsModule } from './details/user-group-details.module';

@NgModule({
  imports: [
    RouterModule,
    UserGroupAssignPermissionModule,
    UserGroupPermissionListModule,
    UserGroupAssignUserModule,
    UserGroupUserListModule,
    UserGroupCreateModule,
    UserGroupEditModule,
    UserGroupFormModule,
    UserGroupListModule,
    UserGroupDetailsModule,
  ],
  providers: [
    provideDefaultConfig(userGroupRoutingConfig),
    provideDefaultConfig(userGroupCmsConfig),
    provideDefaultConfigFactory(userGroupTableConfigFactory),
  ],
})
export class UserGroupComponentsModule {}
