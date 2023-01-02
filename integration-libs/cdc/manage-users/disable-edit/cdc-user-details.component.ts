import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import {
  ItemService,
  UserDetailsComponent,
  UserItemService,
} from '@spartacus/organization/administration/components';
@Component({
  selector: 'cx-org-user-details',
  templateUrl: './cdc-user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UserItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class CdcUserDetailsComponent extends UserDetailsComponent {
  constructor(
    protected itemService: ItemService<B2BUser>,
    protected b2bUserService: B2BUserService
  ) {
    super(itemService, b2bUserService);
  }
}
