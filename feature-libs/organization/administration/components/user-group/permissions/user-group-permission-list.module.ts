import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserGroupAssignedPermissionListComponent } from './assigned/user-group-assigned-permission-list.component';
import { UserGroupPermissionListComponent } from './user-group-permission-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, SubListModule],

  declarations: [
    UserGroupPermissionListComponent,
    UserGroupAssignedPermissionListComponent,
  ],
})
export class UserGroupPermissionModule {}
