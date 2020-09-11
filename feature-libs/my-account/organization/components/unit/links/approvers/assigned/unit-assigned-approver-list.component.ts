import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from 'feature-libs/my-account/organization/components/shared';
import { UnitAssignedApproverListService } from './unit-assigned-approver-list.service';

@Component({
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
