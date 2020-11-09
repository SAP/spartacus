import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UserItemService } from '../services/user-item.service';

@Component({
  selector: 'cx-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UserItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class UserDetailsComponent {
  userGuardSubscription: Subscription;
  model$: Observable<B2BUser> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );

  constructor(protected itemService: OrganizationItemService<B2BUser>) {}
}
