/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { B2BUnit, TranslatePipe, UserIdService } from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  FormErrorsModule,
  LaunchDialogService,
  NgSelectA11yDirective,
} from '@spartacus/storefront';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';

@Component({
  selector: 'cx-b2b-unit-selection-dialog',
  templateUrl: './b2b-unit-selection-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FocusDirective,
    TranslatePipe,
    FormErrorsModule,
    NgSelectComponent,
    NgSelectA11yDirective,
  ],
})
export class B2bUnitSelectionDialogComponent implements OnInit, OnDestroy {
  orgUnits: B2BUnit[] = [];
  protected subscriptions = new Subscription();

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'ng-select',
    focusOnEscape: false,
  };

  form = new FormGroup({
    selectedUnit: new FormControl<B2BUnit | null>(null, [Validators.required]),
  });

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected userIdService: UserIdService,
    protected store: Store
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.launchDialogService.data$
        .pipe(take(1))
        .subscribe((data: { orgUnits: B2BUnit[]; defaultUnitUid?: string }) => {
          this.orgUnits = data?.orgUnits ?? [];
          const matched =
            this.orgUnits.find((u) => u.name === data?.defaultUnitUid) ??
            this.orgUnits[0] ??
            null;
          this.form.get('selectedUnit')?.setValue(matched);
        })
    );
  }

  confirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const unit = this.form.value.selectedUnit;
    if (!unit) {
      return;
    }
    this.userIdService
      .takeUserId(true)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(
          new SetDefaultOrgUnit({ userId, unitUid: unit.name ?? '' })
        );
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
