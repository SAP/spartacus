import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BaseItem,
  ItemService,
  ListComponent,
  ListService,
} from '@spartacus/organization/administration/components';
import { manageUsersService } from '../manage-users.service';

@Component({
  selector: 'cx-org-list',
  templateUrl: './cdc-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdcListComponent<T extends BaseItem> extends ListComponent {
  constructor(
    protected service: ListService<T>,
    protected organizationItemService: ItemService<T>,
    protected manageUsersService: manageUsersService
  ) {
    super(service, organizationItemService);
  }

  protected openDelegateAdmin() {
    this.manageUsersService.openDelegateAdminLogin();
  }
}
