import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';

@Component({
  templateUrl: './organization-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationLinkComponent<T = any> {
  @HostBinding('class') cls: string;

  constructor(protected outlet: OutletContextData<TableDataOutletContext<T>>) {}

  get model(): T {
    return this.outlet.context.data;
  }

  get property(): string {
    return this.model[this.outlet.context._field];
  }

  get route(): string {
    return this.outlet.context._type + 'Details';
  }

  get routeModel(): T {
    return this.outlet.context.data;
  }
}
