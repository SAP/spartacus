import { NgModule } from '@angular/core';
import { UnitUserListModule } from './list/unit-user-list.module';
import { UnitUserRolesModule } from './roles/unit-user-roles.module';

@NgModule({
  imports: [UnitUserListModule, UnitUserRolesModule],
})
export class UnitUsersModule {}
