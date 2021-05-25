import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { SubListModule } from '../../shared/sub-list/sub-list.module';
import { UserAssignedApproverListComponent } from './assigned/user-assigned-approver-list.component';
import { UserApproverListComponent } from './user-approver-list.component';

@NgModule({
  imports: [ListModule, I18nModule, RouterModule, SubListModule],
  declarations: [UserApproverListComponent, UserAssignedApproverListComponent],
})
export class UserApproverListModule {}
