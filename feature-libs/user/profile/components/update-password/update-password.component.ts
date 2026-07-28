/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Optional,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {
  FeatureDirective,
  PageMetaService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form', ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    PasswordVisibilityToggleDirective,
    FormErrorsComponent,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class UpdatePasswordComponent {
  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });
  protected pageMetaService = inject(PageMetaService);

  constructor(protected service: UpdatePasswordComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  pageTitle$: Observable<string> = this.pageMetaService.getHeading();

  onSubmit(): void {
    this.service.updatePassword();
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
