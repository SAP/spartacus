import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  isUpdating$ = new BehaviorSubject(false);

  titles$ = this.userProfile.getTitles();
  user$ = this.userProfile.get();

  constructor(
    protected userProfile: UserProfileFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  form: FormGroup = new FormGroup({
    customerId: new FormControl(''),
    titleCode: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();
    this.isUpdating$.next(true);

    const userUpdates = this.form.value;

    this.userProfile.update(userUpdates).subscribe({
      next: () => this.onSuccess(),
      error: () => {},
      complete: () => this.isUpdating$.next(false),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      {
        key: 'updateProfileForm.profileUpdateSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.reset();
  }

  reset(): void {
    this.form.reset();
    this.form.enable();
  }
}
