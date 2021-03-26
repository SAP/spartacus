import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UpdateProfileService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected busy = new BehaviorSubject(false);

  isUpdating$ = this.busy.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  titles$ = this.userProfile.getTitles();
  user$ = this.userProfile.get();

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
    this.busy.next(true);

    const userUpdates = this.form.value;

    this.userProfile.update(userUpdates).subscribe({
      next: () => this.onSuccess(),
      error: () => {},
      complete: () => this.resetForm(),
    });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      {
        key: 'updateProfileForm.profileUpdateSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  protected resetForm(): void {
    this.busy.next(false);
    this.form.reset();
  }
}
