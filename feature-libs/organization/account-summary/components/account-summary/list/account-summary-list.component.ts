import { Component } from '@angular/core';
import {
  ItemService,
  ListService,
} from '@spartacus/organization/administration/components';
import { UnitTreeService } from '@spartacus/organization/administration/components';
import { AccountSummaryItemService } from '../../services/account-summary-item.service';
import { AccountSummaryListService } from '../../services/account-summary-list.service';
@Component({
  selector: 'cx-account-summary-list',
  templateUrl: './account-summary-list.component.html',
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryListService,
    },
    {
      provide: ItemService,
      useExisting: AccountSummaryItemService,
    },
  ],
})
export class AccountSummaryListComponent {
  constructor(protected unitTreeService: UnitTreeService) {}

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }
}
