/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderHistoryQueryParams } from '@spartacus/organization/unit-order/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-unit-level-order-history-filter',
  templateUrl: './unit-level-order-history-filter.component.html',
})
export class UnitLevelOrderHistoryFilterComponent {
  iconTypes = ICON_TYPE;
  encodedFilter: string;

  filterForm: FormGroup = new FormGroup({
    buyerFilter: new FormControl(),
    unitFilter: new FormControl(),
  });

  filterFormMobile: FormGroup = new FormGroup({
    buyerFilterMobile: new FormControl(),
    unitFilterMobile: new FormControl(),
  });

  filterByBuyer = 'filterByBuyer';
  filterByUnit = 'filterByUnit';

  @ViewChild('filterNav', { read: ElementRef }) filterNav: ElementRef;
  @ViewChild('filterNavUnit', { read: ElementRef }) filterNavUnit: ElementRef;
  @ViewChild('filterNavBuyer', { read: ElementRef }) filterNavBuyer: ElementRef;

  @ViewChild('buyerFilterMobileId', { read: ElementRef })
  buyerFilterMobileId: ElementRef;
  @ViewChild('unitFilterMobileId', { read: ElementRef })
  unitFilterMobileId: ElementRef;

  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  unitFilterMobileValue: string | null;
  buyerFilterMobileValue: string | null;

  constructor(protected renderer: Renderer2) {}

  searchUnitLevelOrders(): void {
    const buyer = this.filterForm.get('buyerFilter')?.value;
    const unit = this.filterForm.get('unitFilter')?.value;
    this.filterFormMobile.setValue({
      buyerFilterMobile: buyer,
      unitFilterMobile: unit,
    });
    this.emitFilterEvent(buyer, unit);
    this.buyerFilterMobileValue = buyer;
    this.unitFilterMobileValue = unit;
  }

  emitFilterEvent(buyer: string, unit: string): void {
    const filters: string[] = [];

    if (buyer?.length) {
      filters.push('user:' + buyer);
    }
    if (unit?.length) {
      filters.push('unit:' + unit);
    }

    filters.unshift(filters.length ? ':' : '');
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage: 0,
      filters: this.encodedFilter,
    });
  }

  clearAll(): void {
    const buyer = this.filterForm.get('buyerFilter')?.value;
    const unit = this.filterForm.get('unitFilter')?.value;
    const buyerMobile = this.buyerFilterMobileId?.nativeElement.value;
    const unitMobile = this.unitFilterMobileId?.nativeElement.value;

    if (buyer || unit || buyerMobile || unitMobile) {
      this.filterForm.reset();
      this.filterFormMobile.reset();
      this.searchUnitLevelOrders();
    }

    this.unitFilterMobileValue = null;
    this.buyerFilterMobileValue = null;
  }

  launchMobileFilters(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '100%');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  searchUnitLevelOrdersForMobile(): void {
    this.getFormValuesForMobileAndEmitFilterEvent();
    this.closeFilterNav();
  }

  getFormValuesForMobileAndEmitFilterEvent(): void {
    const buyer = this.filterFormMobile.get('buyerFilterMobile')?.value;
    this.buyerFilterMobileValue = buyer;
    const unit = this.filterFormMobile.get('unitFilterMobile')?.value;
    this.unitFilterMobileValue = unit;
    this.filterForm.setValue({ buyerFilter: buyer, unitFilter: unit });
    this.emitFilterEvent(buyer, unit);
  }

  closeFilterNav(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
    this.renderer.setStyle(document.body, 'overflow', '');
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.filterNavBuyer.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '0');
    this.filterFormMobile.patchValue({
      buyerFilterMobile: this.buyerFilterMobileValue,
      unitFilterMobile: this.unitFilterMobileValue,
    });
  }

  backFilterSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.filterNavBuyer.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');

    this.filterFormMobile.patchValue({
      buyerFilterMobile: this.buyerFilterMobileValue,
      unitFilterMobile: this.unitFilterMobileValue,
    });
  }

  launchSubNav(option: string): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');

    if (option === this.filterByUnit) {
      this.renderer.setStyle(
        this.filterNavUnit.nativeElement,
        'display',
        'block'
      );
    } else if (option === this.filterByBuyer) {
      this.renderer.setStyle(
        this.filterNavBuyer.nativeElement,
        'display',
        'block'
      );
    }
  }

  clearUnit(): void {
    this.filterForm.get('unitFilter')?.reset();
    this.searchUnitLevelOrders();
  }

  clearBuyer(): void {
    this.filterForm.get('buyerFilter')?.reset();
    this.searchUnitLevelOrders();
  }

  clearUnitMobile(): void {
    this.filterFormMobile.get('unitFilterMobile')?.reset();
    this.renderer.setStyle(document.body, 'overflow', '');
    this.unitFilterMobileValue = null;
    this.getFormValuesForMobileAndEmitFilterEvent();
  }

  clearBuyerMobile(): void {
    this.filterFormMobile.get('buyerFilterMobile')?.reset();
    this.renderer.setStyle(document.body, 'overflow', '');
    this.buyerFilterMobileValue = null;
    this.getFormValuesForMobileAndEmitFilterEvent();
  }

  searchBuyer(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer();
    }
  }

  searchUnit(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit();
    }
  }
}
