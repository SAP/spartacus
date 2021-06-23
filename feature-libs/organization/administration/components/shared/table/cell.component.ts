import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    let contextData: TableDataOutletContext | undefined;
    this.outlet?.context$
      ?.subscribe((context) => (contextData = context))
      .unsubscribe();
    return contextData;
  }

  get property(): string | null {
    let contextData: TableDataOutletContext | undefined;
    this.outlet.context$
      ?.subscribe((context) => (contextData = context))
      .unsubscribe();
    if (contextData) {
      return this.model?.[contextData._field];
    }
    return null;
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
    let contextData: TableDataOutletContext | undefined;
    this.outlet?.context$
      ?.subscribe((context) => (contextData = context))
      .unsubscribe();
    if (contextData) {
      return contextData._options?.cells?.[contextData._field] ?? {};
    }
    return {};
  }

  /**
   * Generates the configurable route to the detail page of the given context item.
   */
  get route(): string {
    let contextData: TableDataOutletContext | undefined;
    this.outlet?.context$
      ?.subscribe((context) => (contextData = context))
      .unsubscribe();
    return contextData?._type + 'Details';
  }

  get routeModel(): any {
    let contextData: TableDataOutletContext | undefined;
    this.outlet?.context$
      ?.subscribe((context) => (contextData = context))
      .unsubscribe();
    return contextData;
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
    let contextData: TableDataOutletContext | undefined;
    this.outlet?.context$
      ?.subscribe((context) => (contextData = context))
      .unsubscribe();

    if (!contextData) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = contextData;
    return all;
  }
}
