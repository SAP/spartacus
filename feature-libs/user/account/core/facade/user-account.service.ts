import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { EventService, UserIdService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { UserAccountActions } from '../store/actions/index';
import { UserAccountSelectors } from '../store/selectors/index';
import { StateWithUserAccount } from '../store/user-account.state';
import { UserAccountChangedEvent } from '@spartacus/user/account/events';

@Injectable()
export class UserAccountService implements UserAccountFacade, OnDestroy {
  eventSubscription: Subscription;

  constructor(
    protected store: Store<StateWithUserAccount>,
    protected userIdService: UserIdService,
    protected eventService: EventService
  ) {
    this.eventSubscription = this.eventService
      .get(UserAccountChangedEvent)
      .subscribe(() => {
        // reload on user account changed event
        this.load();
      });
  }

  /**
   * Returns the current user.
   */
  get(): Observable<User> {
    return this.store.pipe(select(UserAccountSelectors.getDetails)).pipe(
      tap((user) => {
        if (Object.keys(user).length === 0) {
          this.load();
        }
      })
    );
  }

  /**
   * Loads the user's details.
   */
  protected load(): void {
    this.userIdService
      .takeUserId()
      .subscribe((userId) =>
        this.store.dispatch(new UserAccountActions.LoadUserAccount(userId))
      );
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
