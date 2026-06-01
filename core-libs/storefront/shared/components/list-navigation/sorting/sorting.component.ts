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
  viewChild,
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
  ngSelect = viewChild<NgSelectComponent>('ngSelectComponent');

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

    this.sortListEvent.emit(sortCode);
    requestAnimationFrame(() => {
      this.ngSelect()?.focus();
    });
  }

  get selectedLabel() {
    if (this.selectedOption) {
      return (
        this.sortOptions?.find((sort) => sort.code === this.selectedOption)
          ?.name ?? this.sortLabels?.[this.selectedOption]
      );
    }
  }
}
