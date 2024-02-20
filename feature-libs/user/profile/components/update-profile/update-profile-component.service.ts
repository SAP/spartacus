/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UpdateProfileComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  user$ = this.userProfile
    .get()
    .pipe(filter((user): user is User => Boolean(user)));

  protected busy$ = new BehaviorSubject(false);

  updateSucceed$ = new Subject<boolean>();

  isUpdating$: Observable<boolean> = this.user$.pipe(
    tap((user) => this.form.patchValue(user)),
    switchMap((_user: User) => this.busy$),
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  titles$: Observable<Title[]> = this.userProfile.getTitles();

  form: UntypedFormGroup = new UntypedFormGroup({
    customerId: new UntypedFormControl(''),
    titleCode: new UntypedFormControl(''),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
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
    this.updateSucceed$.next(true);
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
    this.updateSucceed$.next(false);
  }
}
