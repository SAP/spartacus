import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { ItemService } from '../../shared/item.service';
import { PermissionItemService } from '../services/permission-item.service';
import { DetailsComponent } from '../../shared/detail/detail.component';

@Component({
  selector: 'cx-org-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: PermissionItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class PermissionDetailsComponent extends DetailsComponent<Permission> {}
