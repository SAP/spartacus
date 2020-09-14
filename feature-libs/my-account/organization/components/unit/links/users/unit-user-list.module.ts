import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationSubListModule } from '../../../shared/organization-sub-list/organization-sub-list.module';
import { ToggleUserRoleModule } from './toggle-user-role/toggle-user-role.module';
import { UnitUserListComponent } from './unit-user-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    OrganizationSubListModule,
    ToggleUserRoleModule,
  ],
  declarations: [UnitUserListComponent],
})
export class UnitUserListModule {}
