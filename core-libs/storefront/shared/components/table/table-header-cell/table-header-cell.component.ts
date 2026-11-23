/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@spartacus/core';
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
  imports: [TranslatePipe],
})
export class TableHeaderCellComponent {
  protected outlet =
    inject<OutletContextData<TableHeaderOutletContext>>(OutletContextData);

  protected readonly outletContext = toSignal(this.outlet.context$);

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
    if (!this.field) {
      return '';
    }
    return (
      (this.fieldOptions?.label as TableHeader)?.i18nKey ||
      `${this.i18nRoot}.${this.field}`
    );
  }

  protected get fieldOptions(): TableFieldOptions | undefined {
    return this.outletContext()?._options?.cells?.[this.field];
  }

  protected get field(): string {
    return this.outletContext()?._field ?? '';
  }

  protected get type(): string {
    return this.outletContext()?._type ?? '';
  }

  protected get i18nRoot(): string | undefined {
    return this.outletContext()?._i18nRoot;
  }
}
