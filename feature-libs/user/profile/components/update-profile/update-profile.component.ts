import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  titles$: Observable<Title[]>;
  user$: Observable<User>;
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private routingService: RoutingService,
    private userProfile: UserProfileFacade,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userProfile.get();
    this.titles$ = this.userProfile.getTitles();
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.globalMessageService.add(
        { key: 'updateProfileForm.profileUpdateSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      this.routingService.go({ cxRoute: 'home' });
    }
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({ userUpdates }: { userUpdates: User }): void {
    this.subscription.add(
      this.userProfile
        .update(userUpdates)
        .pipe(
          tap((state) => {
            this.isLoading$.next(!!state.loading);
            this.onSuccess(!!state.success);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
