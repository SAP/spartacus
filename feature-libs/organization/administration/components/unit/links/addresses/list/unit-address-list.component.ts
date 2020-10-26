import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTE_PARAMS } from '../../../../constants';
import { OrganizationListService } from '../../../../shared/organization-list/organization-list.service';
import { UnitAddressListService } from './unit-address-list.service';

@Component({
  templateUrl: './unit-address-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UnitAddressListService,
    },
  ],
})
export class UnitAddressListComponent {
  routerKey = ROUTE_PARAMS.addressCode;
}
