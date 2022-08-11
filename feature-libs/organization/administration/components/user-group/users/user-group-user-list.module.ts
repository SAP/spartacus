import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserGroupAssignedUserListComponent } from './assigned/user-group-assigned-user-list.component';
import { UserGroupUserListComponent } from './user-group-user-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, SubListModule],
  declarations: [
    UserGroupAssignedUserListComponent,
    UserGroupUserListComponent,
  ],
})
export class UserGroupUserModule {}
