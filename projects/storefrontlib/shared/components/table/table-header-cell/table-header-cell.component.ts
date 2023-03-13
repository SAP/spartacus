/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getLastValueSync } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import {
  TableFieldOptions,
  TableHeader,
  TableHeaderOutletContext,
} from '../table.model';

@Component({
  selector: 'cx-table-header-cell',
  template: `{{
    (header$ | async) || (localizedHeader$ | async | cxTranslate)
  }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  /**
   * Returns the static label for the given field, if available.
   */
  get header$(): Observable<string | undefined> {
    return this.fieldOptions$.pipe(
      map((fieldOptions) =>
        typeof fieldOptions?.label === 'string'
          ? <string>fieldOptions.label
          : undefined
      )
    );
  }

  /**
   * Returns the localized label for the given field.
   *
   * The localized label is either driven by the configured `label.i18nKey`
   * or concatenated by the table `type` and field `key`:
   *
   * `[tableType].[fieldKey]`
   *
   * The localized header can be translated with the `cxTranslate` pipe or `TranslationService`.
   */
  get localizedHeader$(): Observable<string> {
    return this.fieldOptions$.pipe(
      map(
        (fieldOptions) =>
          (fieldOptions?.label as TableHeader)?.i18nKey ||
          `${this.i18nRoot}.${this.field}`
      )
    );
  }

  protected get fieldOptions$(): Observable<TableFieldOptions | undefined> {
    // const context = getLastValueSync(this.outlet.context$);
    return this.outlet.context$.pipe(
      map((context) =>
        this.field ? context?._options?.cells?.[this.field] : undefined
      )
    );
    // return this.field ? context?._options?.cells?.[this.field] : undefined;
  }

  // protected get field$(): Observable<string | undefined> {
  protected get field(): string | undefined {
    // return this.outlet.context$.pipe(map((context) => context?._field));
    const context = getLastValueSync(this.outlet.context$);
    return context?._field;
  }

  protected get type$(): Observable<string | undefined> {
    return this.outlet.context$.pipe(map((context) => context?._type));
  }

  protected get i18nRoot(): string | undefined {
    // protected get i18nRoot$(): Observable<string | undefined> {
    // return this.outlet.context$.pipe(map((context) => context?._i18nRoot));
    const context = getLastValueSync(this.outlet.context$);
    return context?._i18nRoot;
  }
}
