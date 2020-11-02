import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../../shared/organization-list/organization-list.service';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';

@Component({
  selector: 'cx-unit-assigned-approver-list',
  templateUrl: './unit-assigned-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitAssignedApproverListService,
    },
  ],
})
export class UnitAssignedApproverListComponent {}
