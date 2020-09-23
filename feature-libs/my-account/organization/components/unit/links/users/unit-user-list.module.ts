import { NgModule } from '@angular/core';
import { UnitUserListModule } from './list/unit-user-list.module';
import { UnitUserRolesModule } from './roles/unit-user-roles.module';
import { ToggleUserRoleModule } from './toggle-user-role/toggle-user-role.module';

@NgModule({
  imports: [UnitUserListModule, UnitUserRolesModule, ToggleUserRoleModule],
})
export class UnitUsersModule {}
