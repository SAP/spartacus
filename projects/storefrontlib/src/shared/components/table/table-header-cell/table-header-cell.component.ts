import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import {
  TableFieldOptions,
  TableHeader,
  TableHeaderOutletContext,
} from '../table.model';

@Component({
  template: `{{ header || (localizedHeader | cxTranslate) }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCellComponent {
  @HostBinding('class') cls = 'header-wrapper';
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  /**
   * Returns the static label for the given field, if available.
   */
  get header(): string {
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
      `${this.type}.${this.field}`
    );
  }

  protected get fieldOptions(): TableFieldOptions {
    return this.outlet?.context._options?.fields?.[this.field];
  }

  protected get field(): string {
    return this.outlet?.context?._field;
  }

  protected get type(): string {
    return this.outlet?.context?._type;
  }
}
