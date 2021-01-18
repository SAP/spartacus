import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
  User,
  UserService,
} from '@spartacus/core';
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
    private userService: UserService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    // reset the previous form processing state
    this.userService.resetUpdatePersonalDetailsProcessingState();

    this.user$ = this.userService.get();
    this.titles$ = this.userService.getTitles();
    this.loading$ = this.userService.getUpdatePersonalDetailsResultLoading();

    this.subscription.add(
      this.userService
        .getUpdatePersonalDetailsResultSuccess()
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
    this.userService.updatePersonalDetails(userUpdates);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    // clean up the state
    this.userService.resetUpdatePersonalDetailsProcessingState();
  }
}
