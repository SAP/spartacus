/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  FeatureDirective,
  PageMetaService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  BtnLikeLinkDirective,
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  getPageTitle,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form', ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    PasswordVisibilityToggleDirective,
    BtnLikeLinkDirective,
    RouterLink,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class UpdateEmailComponent {
  protected pageMetaService = inject(PageMetaService);

  constructor(protected service: UpdateEmailComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  pageTitle$: Observable<string> = getPageTitle(this.pageMetaService);

  onSubmit(): void {
    this.service.save();
  }
}
