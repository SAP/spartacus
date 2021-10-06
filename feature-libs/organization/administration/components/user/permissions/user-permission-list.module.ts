import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserAssignedPermissionListComponent } from './assigned/user-assigned-permission-list.component';
import { UserPermissionListComponent } from './user-permission-list.component';

@NgModule({
  imports: [ListModule, I18nModule, RouterModule, SubListModule],
  declarations: [
    UserPermissionListComponent,
    UserAssignedPermissionListComponent,
  ],
})
export class UserPermissionListModule {}
