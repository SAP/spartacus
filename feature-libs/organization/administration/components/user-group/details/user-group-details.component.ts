import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { ItemService } from '../../shared/item.service';
import { UserGroupItemService } from '../services/user-group-item.service';
import { DetailsComponent } from '../../shared/detail/detail.component';

@Component({
  selector: 'cx-org-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UserGroupItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class UserGroupDetailsComponent extends DetailsComponent<UserGroup> {}
