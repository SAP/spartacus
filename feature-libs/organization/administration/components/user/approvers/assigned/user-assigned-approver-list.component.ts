import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { UserAssignedApproverListService } from './user-assigned-approver-list.service';

@Component({
  selector: 'cx-org-user-assigned-approver-list',
  templateUrl: './user-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserAssignedApproverListService,
    },
  ],
})
export class UserAssignedApproverListComponent {}
