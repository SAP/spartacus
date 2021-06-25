import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    (header | async) || (localizedHeader$ | async | cxTranslate)
  }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  /**
   * Returns the static label for the given field, if available.
   */
  get header(): Observable<string> {
    return this.outlet?.context$.pipe(
      map((context) => {
        if (typeof this.fieldOptions(context)?.label === 'string') {
          return this.fieldOptions(context)?.label as string;
        } else {
          return '';
        }
      })
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
  get localizedHeader(): Observable<string> {
    return this.outlet?.context$?.pipe(
      map(
        (context) =>
          (this.fieldOptions(context)?.label as TableHeader)?.i18nKey ||
          `${context?._i18nRoot}.${context?._field}`
      )
    );
  }

  protected fieldOptions(
    context: TableHeaderOutletContext
  ): TableFieldOptions | undefined {
    return context?._options?.cells?.[context?._field];
  }
}
