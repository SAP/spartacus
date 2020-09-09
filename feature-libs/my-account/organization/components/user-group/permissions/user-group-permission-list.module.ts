import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationSubListModule } from '../../shared/organization-sub-list/organization-sub-list.module';
import { UserGroupAssignedPermissionListComponent } from './assigned';
import { UserGroupPermissionListComponent } from './user-group-permission-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, RouterModule, OrganizationSubListModule],

  declarations: [
    UserGroupPermissionListComponent,
    UserGroupAssignedPermissionListComponent,
  ],
})
export class UserGroupPermissionModule {}
