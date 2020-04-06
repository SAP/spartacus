import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  RoutingService,
  CxDatePipe,
  EntitiesModel,
  OrgUnitService,
  B2BAddress,
  RouterState,
} from '@spartacus/core';
import { Params } from '@angular/router';

@Component({
  selector: 'cx-unit-manage-addresses',
  templateUrl: './unit-manage-addresses.component.html',
})
export class UnitManageAddressesComponent implements OnInit {
  code: string;
  cxRoute = 'orgUnitManageAddresses';

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected cxDate: CxDatePipe
  ) {}

  private params$: Observable<
    Params
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData: RouterState) => routingData.state.params));

  code$: Observable<string> = this.params$.pipe(
    map((params: Params) => params['code'])
  );

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe(code => (this.code = code));
    this.data$ = this.code$.pipe(
      tap(code => this.orgUnitsService.loadAddresses(code)),
      switchMap(code =>
        this.orgUnitsService.getAddresses(code).pipe(
          filter(Boolean),
          map((addresses: EntitiesModel<B2BAddress>) => ({
            values: addresses.values.map(address => ({
              id: address.id,
              code,
              name: `${address.firstName} ${address.lastName}`,
              formattedAddress: address.formattedAddress,
            })),
          }))
        )
      )
    );
  }
}
