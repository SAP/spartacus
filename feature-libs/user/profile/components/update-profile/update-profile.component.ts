/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
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
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import {
  FeatureDirective,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  NgSelectA11yDirective,
  SpinnerComponent,
  TruncationTooltipDirective,
} from '@spartacus/storefront';
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';

@Component({
  selector: 'cx-update-profile',
  templateUrl: './update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectComponent,
    NgSelectA11yDirective,
    NgFor,
    NgOptionComponent,
    FormRequiredAsterisksComponent,
    FormErrorsComponent,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
    TruncationTooltipDirective,
  ],
})
export class UpdateProfileComponent {
  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  constructor(protected service: UpdateProfileComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;

  onSubmit(): void {
    this.service.updateProfile();
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
