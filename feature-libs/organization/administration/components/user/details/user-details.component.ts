import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { ItemService } from '../../shared/item.service';
import { UserItemService } from '../services/user-item.service';
import { DetailsComponent } from '../../shared/detail/detail.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-org-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: UserItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class UserDetailsComponent extends DetailsComponent<B2BUser> {
  /**
   * @deprecated since version 3.2
   * unused property
   */
  userGuardSubscription?: Subscription;
}
