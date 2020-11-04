import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UnitApproverListService } from './unit-approver-list.service';

@Component({
  selector: 'cx-unit-approver-list',
  templateUrl: './unit-approver-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitApproverListService,
    },
  ],
})
export class UnitApproverListComponent {}
