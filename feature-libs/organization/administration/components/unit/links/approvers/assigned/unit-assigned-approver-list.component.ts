import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../../shared/list/list.service';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';

@Component({
  selector: 'cx-org-unit-assigned-approver-list',
  templateUrl: './unit-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UnitAssignedApproverListService,
    },
  ],
})
export class UnitAssignedApproverListComponent {}
