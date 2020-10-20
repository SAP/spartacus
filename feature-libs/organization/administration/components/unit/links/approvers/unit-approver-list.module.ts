import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationSubListModule } from '../../../shared/organization-sub-list/organization-sub-list.module';
import { UnitAssignedApproverListComponent } from './assigned/unit-assigned-approver-list.component';
import { UnitApproverListComponent } from './unit-approver-list.component';

@NgModule({
  imports: [I18nModule, RouterModule, OrganizationSubListModule],
  declarations: [UnitApproverListComponent, UnitAssignedApproverListComponent],
})
export class UnitApproverListModule {}
