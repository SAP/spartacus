import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
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
