/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';

@Component({
  selector: 'cx-b2b-unit-selection-dialog',
  templateUrl: './b2b-unit-selection-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FocusDirective,
    TranslatePipe,
    FormErrorsModule,
  ],
})
export class B2bUnitSelectionDialogComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  orgUnits: B2BUnit[] = [];
  /** ngOnInit 中计算好，ngAfterViewInit 中使用（届时 *ngFor 已完成渲染）。 */
  private preselectUid: string | null = null;
  protected subscriptions = new Subscription();

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'select',
    focusOnEscape: false,
  };

  form = new FormGroup({
    selectedUnit: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected userIdService: UserIdService,
    protected store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.launchDialogService.data$.pipe(take(1)).subscribe(
        (data: { orgUnits: B2BUnit[]; defaultUnitUid?: string }) => {
          this.orgUnits = data?.orgUnits ?? [];
          // OCC /orgUsers/{userId}/orgUnits 只返回 name，不含 uid。
          // 用 GET /orgUsers/{userId} 返回的 orgUnit.name（即 defaultUnitUid 字段，
          // 现在存的是 name）与列表中的 name 做匹配来确定预选项。
          const matched = this.orgUnits.find(
            (u) => u.name === data?.defaultUnitUid
          );
          this.preselectUid = matched?.name ?? this.orgUnits[0]?.name ?? null;
        }
      )
    );
  }

  ngAfterViewInit(): void {
    // 视图初始化完成后 *ngFor 已将所有 <option> 渲染进 DOM，
    // 此时调用 setValue 才能正确匹配并选中对应选项。
    // detectChanges() 防止开发模式下的 ExpressionChangedAfterItHasBeenCheckedError。
    if (this.preselectUid !== null) {
      this.form.get('selectedUnit')?.setValue(this.preselectUid);
      this.changeDetectorRef.detectChanges();
    }
  }

  confirm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const unitUid = this.form.value.selectedUnit!;
    this.userIdService
      .takeUserId(true)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(new SetDefaultOrgUnit({ userId, unitUid }));
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
