import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { UserApproverListService } from './user-approver-list.service';

@Component({
  selector: 'cx-user-approver-list',
  templateUrl: './user-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserApproverListService,
    },
  ],
})
export class UserApproverListComponent {}
