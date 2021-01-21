import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
} from '@spartacus/core';
import { User } from '@spartacus/user/details/core';
import { UserProfileService } from '@spartacus/user/profile/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  titles$: Observable<Title[]>;
  user$: Observable<User>;
  loading$: Observable<boolean>;

  constructor(
    private routingService: RoutingService,
    private userProfileService: UserProfileService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    // reset the previous form processing state
    this.userProfileService.updateProfileCallState.clear();

    this.user$ = this.userProfileService.get();
    this.titles$ = this.userProfileService.getTitles();
    this.loading$ = this.userProfileService.updateProfileCallState.isLoading();

    this.subscription.add(
      this.userProfileService.updateProfileCallState
        .isSuccessful()
        .subscribe((success) => this.onSuccess(success))
    );
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
    this.userProfileService.update(userUpdates);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userProfileService.updateProfileCallState.clear();
  }
}
