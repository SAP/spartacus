/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Country,
  GlobalMessageService,
  GlobalMessageType,
  Region,
} from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserRegistrationFormService } from './user-registration-form.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { FormRequiredLegendComponent } from '@spartacus/storefront';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectA11yDirective } from '@spartacus/storefront';
import { FormRequiredAsterisksComponent } from '@spartacus/storefront';
import { FormErrorsComponent } from '@spartacus/storefront';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '@spartacus/storefront';
import { UrlPipe } from '@spartacus/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredLegendComponent,
    NgSelectComponent,
    NgSelectA11yDirective,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    RouterLink,
    SpinnerComponent,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    TranslatePipe,
  ],
})
export class UserRegistrationFormComponent implements OnDestroy {
  titles$: Observable<Title[]> = this.userRegistrationFormService.getTitles();

  countries$: Observable<Country[]> =
    this.userRegistrationFormService.getCountries();

  regions$: Observable<Region[]> =
    this.userRegistrationFormService.getRegions();

  registerForm: FormGroup = this.userRegistrationFormService.form;

  isLoading$ = new BehaviorSubject(false);

  protected subscriptions = new Subscription();

  protected globalMessageService = inject(GlobalMessageService, {
    optional: true,
  });

  constructor(
    protected userRegistrationFormService: UserRegistrationFormService
  ) {}

  submit(): void {
    if (this.registerForm.valid) {
      this.isLoading$.next(true);
      this.subscriptions.add(
        this.userRegistrationFormService
          .registerUser(this.registerForm)
          .subscribe({
            complete: () => this.isLoading$.next(false),
            error: () => {
              this.isLoading$.next(false);
              this.globalMessageService?.add(
                { key: 'userRegistrationForm.messageToFailedToRegister' },
                GlobalMessageType.MSG_TYPE_ERROR
              );
            },
          })
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
