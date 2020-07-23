import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { B2BAddress, OrgUnitService, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@spartacus/storefront';

@Component({
  selector: 'cx-unit-address-details',
  templateUrl: './unit-address-details.component.html',
})
export class UnitAddressDetailsComponent implements OnInit {
  address$: Observable<any>;
  addressId: string;

  code$: Observable<string> = this.route.parent.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  addressId$: Observable<string> = this.route.params.pipe(
    map((routingData) => routingData['id'])
  );

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected route: ActivatedRoute,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.address$ = this.code$.pipe(
      withLatestFrom(this.addressId$),
      tap(([orgUnitId]) => this.orgUnitsService.loadAddresses(orgUnitId)),
      switchMap(([orgUnitId, id]) =>
        this.orgUnitsService.getAddress(orgUnitId, id).pipe(
          filter(Boolean),
          map((address: B2BAddress) => ({ ...address, orgUnitId }))
        )
      )
    );
  }

  // deleteAddress() {
  //   this.address$.pipe(take(1)).subscribe((address) => {
  //     this.orgUnitsService.deleteAddress(address.orgUnitId, address.id);
  //     this.routingService.go({
  //       cxRoute: 'orgUnitManageAddresses',
  //       params: { code: address.orgUnitId },
  //     });
  //   });
  // }

  openModal(address, template: TemplateRef<any>): void {
    this.addressId = address.id;
    this.modalService.open(template, {
      centered: true,
    });
  }

  deleteAddress() {
    this.code$
      .pipe(take(1))
      .subscribe((code) =>
        this.orgUnitsService.deleteAddress(code, this.addressId)
      );
  }
}
