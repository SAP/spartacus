import { Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UnitApproverListService } from './unit-approver-list.service';

@Component({
  templateUrl: './unit-approver-list.component.html',
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitApproverListService,
    },
  ],
})
export class UnitApproverListComponent {}
