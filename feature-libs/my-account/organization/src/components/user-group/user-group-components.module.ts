import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { UserGroupAssignUsersModule } from './users/assign/user-group-assign-user.module';
import { UserGroupUserListModule } from './users/list/user-group-user-list.module';
import {
  userGroupCmsConfig,
  userGroupRoutingConfig,
  userGroupTableConfigFactory,
} from './user-group.config';
import { UserGroupCreateModule } from './create/user-group-create.module';
import { UserGroupEditModule } from './edit/user-group-edit.module';
import { UserGroupFormModule } from './form/user-group-form.module';
import { UserGroupListModule } from './list/user-group-list.module';

@NgModule({
  imports: [
    RouterModule,
    UserGroupAssignUsersModule,
    UserGroupUserListModule,
    UserGroupCreateModule,
    UserGroupEditModule,
    UserGroupFormModule,
    UserGroupListModule,
  ],
  providers: [
    provideDefaultConfig(userGroupRoutingConfig),
    provideDefaultConfig(userGroupCmsConfig),
    provideDefaultConfigFactory(userGroupTableConfigFactory),
  ],
})
export class UserGroupComponentsModule {}
