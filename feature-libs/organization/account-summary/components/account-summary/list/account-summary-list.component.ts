import { Component } from '@angular/core';
import {
  ItemService,
  ListService,
  UnitListComponent,
} from '@spartacus/organization/administration/components';
import { AccountSummaryItemService } from '../../services/account-summary-item.service';
import { AccountSummaryUnitListService } from '../../services/account-summary-unit-list.service';
@Component({
  selector: 'cx-account-summary-list',
  templateUrl: './account-summary-list.component.html',
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: AccountSummaryUnitListService,
    },
    {
      provide: ItemService,
      useExisting: AccountSummaryItemService,
    },
  ],
})
export class AccountSummaryListComponent extends UnitListComponent {}
