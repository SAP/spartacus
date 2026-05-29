/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import {
  FeatureConfigService,
  SortModel,
  TranslatePipe,
} from '@spartacus/core';
import { FocusDirective } from '../../../../layout/a11y/keyboard-focus/focus.directive';
import { NgSelectA11yDirective } from '../../ng-select-a11y/ng-select-a11y.directive';

@Component({
  selector: 'cx-sorting',
  templateUrl: './sorting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgSelectComponent,
    FormsModule,
    NgSelectA11yDirective,
    NgFor,
    NgOptionComponent,
    TranslatePipe,
    FocusDirective,
  ],
})
export class SortingComponent {
  @Input()
  sortOptions: SortModel[] | undefined;
  @Input()
  ariaControls: string;
  @Input()
  ariaLabel: string | undefined;
  @Input()
  selectedOption: string | undefined;
  @Input()
  placeholder: string;
  @Input()
  sortLabels: { [code: string]: string } | null;

  @Output()
  sortListEvent: EventEmitter<string>;

  protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private featureConfigService = inject(FeatureConfigService);

  constructor() {
    this.sortListEvent = new EventEmitter<string>();
  }

  sortList(sortCode: string): void {
    if (!this.featureConfigService.isEnabled('a11yRestoreFocusOnNgSelect')) {
      this.sortListEvent.emit(sortCode);
      return;
    }

    // Bridge the bubble gap: `cxFocus`/persist-focus listens for the native
    // non-bubbling `focus` on `<ng-select>`, but the actual focus target is
    // the inner `[role="combobox"]`. We dispatch a synthetic `focus` on
    // `<ng-select>` so persist-focus captures the key for the upcoming
    // destroy/remount cycle. Done here (and not from a focusin listener)
    // so the key is only set on user-driven sort actions — programmatic
    // restores don't re-set it, preserving `clearOnRestore`'s route-leak
    // protection.
    this.elementRef.nativeElement
      .querySelector<HTMLElement>('ng-select')
      ?.dispatchEvent(new FocusEvent('focus'));

    this.sortListEvent.emit(sortCode);

    // Covers the case where the parent does not destroy/recreate this
    // component on sort (e.g. PLP, where the parent reacts to a queryParam
    // change without remounting). `cxFocus`/persist-focus only restores on
    // mount, so without an explicit refocus the combobox would lose focus
    // after the parent's view re-evaluates. setTimeout (macrotask) is
    // needed because ng-select's async `change` work resets focus and a
    // microtask runs too early.
    setTimeout(() => this.focusCombobox());
  }

  get selectedLabel() {
    if (this.selectedOption) {
      return (
        this.sortOptions?.find((sort) => sort.code === this.selectedOption)
          ?.name ?? this.sortLabels?.[this.selectedOption]
      );
    }
  }

  protected focusCombobox(): void {
    this.elementRef.nativeElement
      .querySelector<HTMLElement>('[role="combobox"]')
      ?.focus({ preventScroll: true });
  }
}
