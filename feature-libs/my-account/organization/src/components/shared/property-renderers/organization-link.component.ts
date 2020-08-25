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
  @HostBinding('class') cls = 'content-wrapper';

  constructor(protected outlet: OutletContextData<TableDataOutletContext<T>>) {}

  get model(): any {
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
}
