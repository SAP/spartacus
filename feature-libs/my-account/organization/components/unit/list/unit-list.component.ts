import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UnitListService } from '../services/unit-list.service';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UnitItemService } from '../services/unit-item.service';

@Component({
  selector: 'cx-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitListService,
    },
    {
      provide: OrganizationItemService,
      useExisting: UnitItemService,
    },
  ],
})
export class UnitListComponent {
  constructor(protected uls: UnitListService) {}

  expandAll() {
    this.uls.expandAll();
  }

  collapseAll() {
    this.uls.collapseAll();
  }
}
