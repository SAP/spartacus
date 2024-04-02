/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import {
  TableFieldOptions,
  TableHeader,
  TableHeaderOutletContext,
} from '../table.model';

@Component({
  selector: 'cx-table-header-cell',
  template: `{{ header || (localizedHeader | cxTranslate) }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  /**
   * Returns the static label for the given field, if available.
   */
  get header(): string | undefined {
    if (typeof this.fieldOptions?.label === 'string') {
      return <string>this.fieldOptions.label;
    }
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
  get localizedHeader(): string {
    return (
      (this.fieldOptions?.label as TableHeader)?.i18nKey ||
      `${this.i18nRoot}.${this.field}`
    );
  }

  protected get fieldOptions(): TableFieldOptions | undefined {
    return this.outlet?.context._options?.cells?.[this.field];
  }

  protected get field(): string {
    return this.outlet?.context?._field;
  }

  protected get type(): string {
    return this.outlet?.context?._type;
  }

  protected get i18nRoot(): string | undefined {
    return this.outlet?.context?._i18nRoot;
  }
}
