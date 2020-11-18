import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserAssignedUserGroupListComponent } from './assigned/user-assigned-user-group-list.component';
import { UserUserGroupListComponent } from './user-user-group-list.component';

@NgModule({
  imports: [ListModule, I18nModule, RouterModule, SubListModule],
  declarations: [
    UserUserGroupListComponent,
    UserAssignedUserGroupListComponent,
  ],
})
export class UserUserGroupsModule {}
