/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {
  FeatureDirective,
  GlobalMessageType,
  PageMetaService,
  TranslatePipe,
  User,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  MessageComponent,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UpdateEmailComponentService } from './update-email-component.service';

@Component({
  selector: 'cx-my-account-v2-email',
  templateUrl: './my-account-v2-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    MessageComponent,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    PasswordVisibilityToggleDirective,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class MyAccountV2EmailComponent implements OnInit {
  protected emailComponentService = inject(UpdateEmailComponentService);
  protected userProfile = inject(UserProfileFacade);
  protected pageMetaService = inject(PageMetaService);
  form: UntypedFormGroup = this.emailComponentService.form;
  isUpdating$: Observable<boolean> = this.emailComponentService.isUpdating$;
  isEditing: boolean;
  showingAlert: boolean;
  pageTitle$ = this.pageMetaService.getHeading();

  user$ = this.userProfile
    .get()
    .pipe(filter((user): user is User => Boolean(user)));
  globalMessageType = GlobalMessageType;

  ngOnInit(): void {
    this.isEditing = false;
  }
  onSubmit(): void {
    this.emailComponentService.save();
    this.emailComponentService.updateSucceed$.subscribe((res) => {
      this.isEditing = !res;
    });
  }

  onEdit(): void {
    this.isEditing = true;
    this.showingAlert = true;
    this.form.reset();
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  closeDialogConfirmationAlert() {
    this.showingAlert = false;
  }
}
