/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
import {TranslationService} from '@spartacus/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderHistoryQueryParams} from '../../../core/model/augmented-core.model';
import {ICON_TYPE} from "@spartacus/storefront";

@Component({
  selector: 'cx-unit-level-order-history-filter',
  templateUrl: './unit-level-order-history-filter.component.html'
})
export class UnitLevelOrderHistoryFilterComponent {
  iconTypes = ICON_TYPE;
  encodedFilter: string;

  filterForm: FormGroup = new FormGroup({
    buyerFilter: new FormControl('', {updateOn: 'submit'}),
    unitFilter: new FormControl('', {updateOn: 'submit'}),
  });

  filterFormMobile: FormGroup = new FormGroup({
    BuyerFilterMobile: new FormControl('', {updateOn: 'submit'}),
    unitFilterMobile: new FormControl('', {updateOn: 'submit'}),
  });

  filterByBuyer = 'filterByBuyer';
  filterByUnit = 'filterByUnit';

  @ViewChild('unitButton', {read: ElementRef}) unitButton: ElementRef;
  @ViewChild('buyerButton', {read: ElementRef}) buyerButton: ElementRef;
  @ViewChild('unitButtonMobile', {read: ElementRef}) unitButtonMobile: ElementRef;
  @ViewChild('buyerButtonMobile', {read: ElementRef}) buyerButtonMobile: ElementRef;

  @ViewChild('unitPresentation', {read: ElementRef}) unitPresentation: ElementRef;
  @ViewChild('buyerPresentation', {read: ElementRef}) buyerPresentation: ElementRef;
  @ViewChild('unitPresentationMobile', {read: ElementRef}) unitPresentationMobile: ElementRef;
  @ViewChild('buyerPresentationMobile', {read: ElementRef}) buyerPresentationMobile: ElementRef;

  @ViewChild('filterNav', {read: ElementRef}) filterNav: ElementRef;
  @ViewChild('filterNavUnit', {read: ElementRef}) filterNavUnit: ElementRef;
  @ViewChild('filterNavBuyer', {read: ElementRef}) filterNavBuyer: ElementRef;

  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor(
    protected translation: TranslationService,
    protected renderer: Renderer2,
  ) {
  }

  SearchUnitLevelOrders(): void {
    this.filterForm.valueChanges.subscribe(() => {
      let user = this.filterForm.get('buyerFilter')?.value;
      let unit = this.filterForm.get('unitFilter')?.value;
      this.filterFormMobile.setValue({'BuyerFilterMobile': user, 'unitFilterMobile': unit})
      this.emitFilterEvent(user, unit);
    })
  }

  emitFilterEvent(user: string, unit: string): void {
    let filters: string[] = [];

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage: 0,
      filters: this.encodedFilter,
    });
  }

  clearAll(): void {
    let user = this.filterForm.get('buyerFilter')?.value;
    let unit = this.filterForm.get('unitFilter')?.value;

    if (user || unit) {
      this.filterForm.reset();
      this.filterFormMobile.reset();
      this.SearchUnitLevelOrders();
    }

    this.renderer.setStyle(this.unitButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'none');

    this.renderer.setStyle(this.unitPresentationMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentationMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.unitPresentation.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentation.nativeElement, 'display', 'block');
  }

  launchMobileFilters(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '100%');
  }

  SearchUnitLevelOrdersForMobile(): void {
    this.filterFormMobile.valueChanges.subscribe(() => {
      let user = this.filterFormMobile.get('BuyerFilterMobile')?.value;
      let unit = this.filterFormMobile.get('unitFilterMobile')?.value;
      this.filterForm.setValue({'buyerFilter': user, 'unitFilter': unit});
      this.emitFilterEvent(user, unit);
    })

    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
  }

  closeFilterNav(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '0');
  }

  closeFilterSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
  }

  backFilterSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
  }

  launchSubNav(option: string): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');

    if (option === this.filterByUnit) {
      this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'block');
    } else if (option === this.filterByBuyer) {
      this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'block');
    }
  }

  clearUnit(): void {
    this.filterForm.get('unitFilter')?.reset();
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.unitPresentation.nativeElement, 'display', 'block');
    this.SearchUnitLevelOrders();
  }

  clearBuyer(): void {
    this.filterForm.get('buyerFilter')?.reset();
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerPresentation.nativeElement, 'display', 'block');
    this.SearchUnitLevelOrders();
  }

  clearUnitMobile(): void {
    this.filterFormMobile.get('unitFilterMobile')?.reset();
    this.renderer.setStyle(this.unitButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.unitPresentationMobile.nativeElement, 'display', 'block');
    this.SearchUnitLevelOrdersForMobile();
  }

  clearBuyerMobile(): void {
    this.filterFormMobile.get('BuyerFilterMobile')?.reset();
    this.renderer.setStyle(this.buyerButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerPresentationMobile.nativeElement, 'display', 'block');
    this.SearchUnitLevelOrdersForMobile();
  }

  searchBuyer(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer();
      return;
    }
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentation.nativeElement, 'display', 'none');
  }

  searchUnit(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit();
      return;
    }
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.unitPresentation.nativeElement, 'display', 'none');
  }

  searchBuyerMobile(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer();
      return;
    }
    this.renderer.setStyle(this.buyerButtonMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentationMobile.nativeElement, 'display', 'none');
  }

  searchUnitMobile(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit();
      return;
    }
    this.renderer.setStyle(this.unitButtonMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.unitPresentationMobile.nativeElement, 'display', 'none');
  }
}
