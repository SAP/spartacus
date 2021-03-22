import { Component } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent {
  titles$: Observable<Title[]> = this.userProfile.getTitles();
  user$: Observable<User | undefined> = this.userProfile.get();
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private routingService: RoutingService,
    private userProfile: UserProfileFacade,
    private globalMessageService: GlobalMessageService
  ) {}

  onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updateProfileForm.profileUpdateSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({ cxRoute: 'home' });
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({ userUpdates }: { userUpdates: User }): void {
    debugger;
    this.isLoading$.next(true);

    this.userProfile.update(userUpdates).subscribe({
      next: () => this.onSuccess(),
      error: () => {},
      complete: () => this.isLoading$.next(false),
    });
  }
}
