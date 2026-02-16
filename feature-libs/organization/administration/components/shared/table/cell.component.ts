/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureConfigService, UrlPipe } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
  TableFieldOptions,
} from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-org-cell',
  templateUrl: './cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, NgTemplateOutlet, UrlPipe],
})
export class CellComponent implements OnInit, OnDestroy {
  contextSubscription: Subscription;
  changeDetectorRef = inject(ChangeDetectorRef);
  private featureConfigService = inject(FeatureConfigService);

  constructor(protected outlet: OutletContextData<TableDataOutletContext>) {}

  ngOnInit(): void {
    if (this.featureConfigService.isEnabled('a11yCardNotificationMessage')) {
      this.contextSubscription = this.outlet.context$.subscribe((context) => {
        this.outlet.context = context;
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.contextSubscription?.unsubscribe();
  }

  get tabIndex(): number {
    return -1;
  }

  get model(): TableDataOutletContext {
    return this.outlet.context;
  }

  get property(): string | undefined {
    return this.model?.[this.outlet?.context?._field];
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
      this.outlet.context?._options?.cells?.[this.outlet.context?._field] ?? {}
    );
  }

  /**
   * Generates the configurable route to the detail page of the given context item.
   */
  get route(): string {
    return this.outlet.context._type + 'Details';
  }

  get routeModel(): any {
    return this.outlet.context;
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
    if (!this.outlet.context) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
    return all;
  }
}
