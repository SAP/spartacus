/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { B2BUnit, TranslatePipe } from '@spartacus/core';
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

/**
 * Dialog component for B2B unit selection.
 *
 * This component is standalone and rendered in the root outlet via
 * `inlineRoot: true`. It does NOT inject `B2bUnitSelectionService` because
 * that service is module-scoped (lives in the lazy feature module's child
 * injector) and is therefore not reachable from the root outlet context.
 *
 * Instead, `B2bUnitSelectionService.openDialogWhenReady` passes an `onConfirm`
 * callback via the dialog data payload. On confirmation this component calls
 * that callback with the selected unit name, which triggers `setDefaultUnit`
 * in the service. The service then calls `LaunchDialogService.closeDialog` on
 * HTTP success — preserving the original close-after-persist behaviour.
 */
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
  protected launchDialogService = inject(LaunchDialogService);

  orgUnits: B2BUnit[] = [];
  protected subscriptions = new Subscription();

  private onConfirm?: (unitName: string) => void;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'ng-select',
    focusOnEscape: false,
  };

  form = new FormGroup({
    selectedUnit: new FormControl<B2BUnit | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.subscriptions.add(
      this.launchDialogService.data$
        .pipe(take(1))
        .subscribe(
          (data: {
            orgUnits: B2BUnit[];
            defaultUnitName?: string;
            onConfirm?: (unitName: string) => void;
          }) => {
            this.orgUnits = data?.orgUnits ?? [];
            this.onConfirm = data?.onConfirm;
            const matched =
              this.orgUnits.find((u) => u.name === data?.defaultUnitName) ??
              this.orgUnits[0] ??
              null;
            this.form.get('selectedUnit')?.setValue(matched);
          }
        )
    );
  }

  /**
   * Invokes the `onConfirm` callback provided by `B2bUnitSelectionService`
   * via the dialog data payload. The service handles the API call and closes
   * the dialog on success via `LaunchDialogService.closeDialog`.
   */
  confirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const unit = this.form.value.selectedUnit;
    if (!unit) {
      return;
    }
    this.onConfirm?.(unit.name ?? '');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
