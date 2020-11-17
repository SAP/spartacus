import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UnitCostCenterListService } from './unit-cost-centers.service';

@Component({
  selector: 'cx-org-unit-cost-centers',
  templateUrl: './unit-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitCostCenterListService,
    },
  ],
})
export class UnitCostCenterListComponent {}
