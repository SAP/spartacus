import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { UserItemService } from '../services/user-item.service';

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
export class UserDetailsComponent {
  userGuardSubscription: Subscription;
  model$: Observable<B2BUser> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;

  constructor(protected itemService: ItemService<B2BUser>) {}
}
