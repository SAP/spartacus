/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
  TableFieldOptions,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  get model$(): Observable<TableDataOutletContext | undefined> {
    return this.outlet.context$;
  }

  get property$(): Observable<string | undefined> {
    return combineLatest([this.model$, this.outlet.context$]).pipe(
      map(([model, context]) => model?.[context?._field])
    );
  }

  /**
   * Indicates wether the cell is linkable.
   *
   * If the cells is linkable, an anchor link is created to the detailed route
   * of the given `_type`.
   *
   * Defaults to `true`.
   */
  get linkable$(): Observable<boolean> {
    return combineLatest([this.property$, this.cellOptions$]).pipe(
      map(
        ([property, cellOptions]) =>
          property !== undefined && (cellOptions.linkable ?? true)
      )
    );
  }

  /**
   * Helper method to access the cell options.
   */
  get cellOptions$(): Observable<TableFieldOptions> {
    return this.outlet.context$.pipe(
      map((context) => context?._options?.cells?.[context?._field] ?? {})
    );
  }

  /**
   * Generates the configurable route to the detail page of the given context item.
   */
  get route$(): Observable<string> {
    return this.outlet.context$.pipe(
      map((context) => context?._type + 'Details')
    );
  }

  get routeModel$(): Observable<any> {
    return this.outlet.context$;
  }

  get type$(): Observable<string | undefined> {
    return this.model$.pipe(map((model) => model?._type));
  }

  /**
   * Indicates whether the item is loaded.
   */
  get hasItem$(): Observable<boolean> {
    return this.item$.pipe(
      map((item) => !!item && Object.keys(item).length > 0)
    );
  }

  protected get item$(): Observable<any> {
    return this.outlet.context$.pipe(
      map((context) => {
        if (!context) {
          return null;
        }
        const { _field, _options, _type, _i18nRoot, ...all } = context;
        return all;
      })
    );
  }
}
