/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject, OnDestroy, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseSite, BaseSiteService, Country, Region, RoutingService } from '@spartacus/core';
import { Title } from '@spartacus/user/profile/root';
import { BehaviorSubject, filter, Observable, Subscription, take } from 'rxjs';
import { UserRegistrationFormService } from './user-registration-form.service';

@Component({
  selector: 'cx-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Optional() protected baseSiteService = inject(BaseSiteService, {
    optional: true,
  });

  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  constructor(
    protected userRegistrationFormService: UserRegistrationFormService
  ) {
    this.baseSiteService?.get().pipe(
      filter((site) => site != null),
      take(1)).subscribe
      ((baseSite: BaseSite) => {
        if (baseSite?.registrationEnabled === false) {
          {
            this.routingService?.go('/');
          }
        }
      });
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.isLoading$.next(true);
      this.subscriptions.add(
        this.userRegistrationFormService
          .registerUser(this.registerForm)
          .subscribe({
            complete: () => this.isLoading$.next(false),
            error: () => this.isLoading$.next(false),
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
