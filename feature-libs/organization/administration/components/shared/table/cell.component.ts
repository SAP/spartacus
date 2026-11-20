/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FeatureToggles, UrlPipe } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
  TableFieldOptions,
} from '@spartacus/storefront';
import { take } from 'rxjs';

@Component({
  selector: 'cx-org-cell',
  templateUrl: './cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet, UrlPipe],
})
export class CellComponent implements OnInit {
  protected outlet =
    inject<OutletContextData<TableDataOutletContext>>(OutletContextData);

  protected readonly initialContext = toSignal(
    this.outlet.context$.pipe(take(1)),
    { initialValue: { _type: '', _field: '' } }
  );
  protected updatedContext?: TableDataOutletContext;

  protected get currentContext(): TableDataOutletContext {
    return this.updatedContext ?? this.initialContext();
  }

  protected set currentContext(context: TableDataOutletContext) {
    this.updatedContext = context;
  }

  changeDetectorRef = inject(ChangeDetectorRef);
  private featureToggles = inject(FeatureToggles);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.featureToggles.a11yCardNotificationMessage) {
      this.outlet.context$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((context) => {
          this.currentContext = context;
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  get tabIndex(): number {
    return -1;
  }

  get model(): TableDataOutletContext {
    return this.currentContext;
  }

  get property(): string | undefined {
    return this.model?.[this.currentContext?._field];
  }

  /**
   * Indicates wether the cell is linkable.
   *
   * If the cells is linkable, an anchor link is created to the detailed route
   * of the given `_type`.
   *
   * Defaults to `false`.
   */
  get linkable(): boolean {
    return this.property !== undefined && (this.cellOptions.linkable ?? false);
  }

  /**
   * Helper method to access the cell options.
   */
  get cellOptions(): TableFieldOptions {
    return (
      this.currentContext?._options?.cells?.[this.currentContext?._field] ?? {}
    );
  }

  /**
   * Generates the configurable route to the detail page of the given context item.
   */
  get route(): string {
    return this.currentContext._type + 'Details';
  }

  get routeModel(): any {
    return this.currentContext;
  }

  get type(): string {
    return this.model._type;
  }

  /**
   * Indicates whether the item is loaded.
   */
  get hasItem(): boolean {
    return !!this.item && Object.keys(this.item).length > 0;
  }

  protected get item(): any {
    if (!this.currentContext) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = this.currentContext;
    return all;
  }
}
