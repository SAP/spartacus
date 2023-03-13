/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getLastValueSync } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
  TableFieldOptions,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-org-cell',
  templateUrl: './cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  constructor(protected outlet: OutletContextData<TableDataOutletContext>) {}

  get tabIndex(): number {
    return -1;
  }

  get model(): TableDataOutletContext | undefined {
    const context = getLastValueSync(this.outlet.context$);
    return context;
  }

  get property(): string | undefined {
    const context = getLastValueSync(this.outlet.context$);
    return context ? this.model?.[context?._field] : undefined;
  }

  /**
   * Indicates wether the cell is linkable.
   *
   * If the cells is linkable, an anchor link is created to the detailed route
   * of the given `_type`.
   *
   * Defaults to `true`.
   */
  get linkable(): boolean {
    return this.property !== undefined && (this.cellOptions.linkable ?? true);
  }

  /**
   * Helper method to access the cell options.
   */
  get cellOptions(): TableFieldOptions {
    const context = getLastValueSync(this.outlet.context$);
    return context?._options?.cells?.[context?._field] ?? {};
  }

  /**
   * Generates the configurable route to the detail page of the given context item.
   */
  get route(): string {
    const context = getLastValueSync(this.outlet.context$);
    return context?._type + 'Details';
  }

  get routeModel(): any {
    const context = getLastValueSync(this.outlet.context$);
    return context;
  }

  get type(): string | undefined {
    return this.model?._type;
  }

  /**
   * Indicates whether the item is loaded.
   */
  get hasItem(): boolean {
    return !!this.item && Object.keys(this.item).length > 0;
  }

  protected get item(): any {
    const context = getLastValueSync(this.outlet.context$);
    if (!context) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = context;
    return all;
  }
}
