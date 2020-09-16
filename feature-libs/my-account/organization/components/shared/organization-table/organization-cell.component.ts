import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
  TableFieldOptions,
} from '@spartacus/storefront';

@Component({
  templateUrl: './organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationCellComponent {
  constructor(protected outlet: OutletContextData<TableDataOutletContext>) {}

  get tabIndex(): number {
    return -1;
  }

  get model(): TableDataOutletContext {
    return this.outlet.context;
  }

  get property(): string {
    return this.model[this.outlet?.context?._field];
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
    return this.cellOptions.linkable ?? true;
  }

  /**
   * Helper method to access the cell options.
   */
  get cellOptions(): TableFieldOptions {
    return this.outlet.context?._options?.cells?.[this.property] || {};
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
}
