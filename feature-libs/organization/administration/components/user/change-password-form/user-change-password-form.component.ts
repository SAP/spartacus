/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { useFeatureStyles, User } from '@spartacus/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { MessageService } from '../../shared/message/services/message.service';
import { UserItemService } from '../services/user-item.service';
import { UserChangePasswordFormService } from './user-change-password-form.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FocusDirective } from '../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { RouterLink } from '@angular/router';
import { FormRequiredLegendComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { PasswordVisibilityToggleDirective } from '../../../../../../projects/storefrontlib/shared/components/form/password-visibility-toggle/password-visibility-toggle.directive';
import { FormErrorsComponent } from '../../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '../../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-org-user-change-password-form',
  templateUrl: './user-change-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper', ngSkipHydration: 'true' },
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    FocusDirective,
    RouterLink,
    FormRequiredLegendComponent,
    FormRequiredAsterisksComponent,
    PasswordVisibilityToggleDirective,
    FormErrorsComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class UserChangePasswordFormComponent {
  form$: Observable<UntypedFormGroup | null> = this.itemService.current$.pipe(
    map((item) => this.formService.getForm(item))
  );

  constructor(
    protected itemService: UserItemService,
    protected formService: UserChangePasswordFormService,
    protected messageService: MessageService
  ) {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

  save(form: UntypedFormGroup): void {
    this.itemService.current$
      .pipe(
        first(),
        switchMap((item) =>
          this.itemService.save(form, (form.value as User).customerId).pipe(
            take(1),
            filter((data) => data.status === LoadStatus.SUCCESS),
            map((data) => ({
              ...item,
              ...data.item,
            }))
          )
        )
      )
      .subscribe((data) => {
        this.notify(data);
        this.itemService.launchDetails(data);
      });
  }

  protected notify(item: User) {
    this.messageService.add({
      message: {
        key: `orgUser.messages.updatePassword`,
        params: {
          item,
        },
      },
    });
  }
}
