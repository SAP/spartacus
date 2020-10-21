import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationListModule } from '../../shared/organization-list/organization-list.module';
import { OrganizationSubListModule } from '../../shared/organization-sub-list/organization-sub-list.module';
import { UserAssignedPermissionListComponent } from './assigned/user-assigned-permission-list.component';
import { UserPermissionListComponent } from './user-permission-list.component';

@NgModule({
  imports: [
    OrganizationListModule,
    I18nModule,
    RouterModule,
    OrganizationSubListModule,
  ],
  declarations: [
    UserPermissionListComponent,
    UserAssignedPermissionListComponent,
  ],
})
export class UserPermissionListModule {}
