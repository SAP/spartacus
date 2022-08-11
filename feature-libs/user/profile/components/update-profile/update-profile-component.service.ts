import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UpdateProfileComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected user$ = this.userProfile
    .get()
    .pipe(filter((user): user is User => Boolean(user)));

  protected busy$ = new BehaviorSubject(false);

  isUpdating$: Observable<boolean> = this.user$.pipe(
    tap((user) => this.form.patchValue(user)),
    switchMap((_user: User) => this.busy$),
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  titles$: Observable<Title[]> = this.userProfile.getTitles();

  form: FormGroup = new FormGroup({
    customerId: new FormControl(''),
    titleCode: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  /**
   * Updates the user's details and handles the UI.
   */
  updateProfile(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    this.userProfile.update(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: (error: Error) => this.onError(error),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      {
        key: 'updateProfileForm.profileUpdateSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    this.busy$.next(false);
    this.form.reset();
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
  }
}
