/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { TranslationService } from '@spartacus/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderHistoryQueryParams } from '../../../core/model/augmented-core.model';
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

  @ViewChild('unitButton', { read: ElementRef }) unitButton: ElementRef;
  @ViewChild('buyerButton', { read: ElementRef }) buyerButton: ElementRef;
  @ViewChild('unitButtonMobile', { read: ElementRef })
  unitButtonMobile: ElementRef;
  @ViewChild('buyerButtonMobile', { read: ElementRef })
  buyerButtonMobile: ElementRef;

  @ViewChild('unitPresentation', { read: ElementRef })
  unitPresentation: ElementRef;
  @ViewChild('buyerPresentation', { read: ElementRef })
  buyerPresentation: ElementRef;
  @ViewChild('unitPresentationMobile', { read: ElementRef })
  unitPresentationMobile: ElementRef;
  @ViewChild('buyerPresentationMobile', { read: ElementRef })
  buyerPresentationMobile: ElementRef;

  @ViewChild('filterNav', { read: ElementRef }) filterNav: ElementRef;
  @ViewChild('filterNavUnit', { read: ElementRef }) filterNavUnit: ElementRef;
  @ViewChild('filterNavBuyer', { read: ElementRef }) filterNavBuyer: ElementRef;

  @ViewChild('buyerFilterMobileId', { read: ElementRef })
  buyerFilterMobileId: ElementRef;
  @ViewChild('unitFilterMobileId', { read: ElementRef })
  unitFilterMobileId: ElementRef;
  @ViewChild('removeAppliedFilters', { read: ElementRef })
  removeAppliedFilters: ElementRef;

  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor(
    protected translation: TranslationService,
    protected renderer: Renderer2
  ) {}

  searchUnitLevelOrders(): void {
    let buyer = this.filterForm.get('buyerFilter')?.value;
    let unit = this.filterForm.get('unitFilter')?.value;
    this.filterFormMobile.setValue({ buyer, unit });
    this.emitFilterEvent(buyer, unit);
  }

  emitFilterEvent(buyer: string, unit: string): void {
    let filters: string[] = [];

    buyer?.length ? filters.push('user:' + buyer) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage: 0,
      filters: this.encodedFilter,
    });
  }

  clearAll(): void {
    let buyer = this.filterForm.get('buyerFilter')?.value;
    let unit = this.filterForm.get('unitFilter')?.value;
    let buyerMobile = this.buyerFilterMobileId?.nativeElement.value;
    let unitMobile = this.unitFilterMobileId?.nativeElement.value;

    if (buyer || unit || buyerMobile || unitMobile) {
      this.filterForm.reset();
      this.filterFormMobile.reset();
      this.searchUnitLevelOrders();
    }

    this.renderer.setStyle(
      this.unitButtonMobile.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(
      this.buyerButtonMobile.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.removeAppliedFilters.nativeElement,
      'display',
      'none'
    );

    this.renderer.setStyle(
      this.unitPresentationMobile.nativeElement,
      'display',
      'block'
    );
    this.renderer.setStyle(
      this.buyerPresentationMobile.nativeElement,
      'display',
      'block'
    );
    this.renderer.setStyle(
      this.unitPresentation.nativeElement,
      'display',
      'block'
    );
    this.renderer.setStyle(
      this.buyerPresentation.nativeElement,
      'display',
      'block'
    );
  }

  launchMobileFilters(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '100%');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  searchUnitLevelOrdersForMobile(): void {
    let buyer = this.filterFormMobile.get('buyerFilterMobile')?.value;
    let unit = this.filterFormMobile.get('unitFilterMobile')?.value;
    this.filterForm.setValue({ buyer, unit });
    this.emitFilterEvent(buyer, unit);

    if (buyer || unit) {
      this.renderer.setStyle(
        this.removeAppliedFilters.nativeElement,
        'display',
        'flex'
      );
    } else {
      this.renderer.setStyle(
        this.removeAppliedFilters.nativeElement,
        'display',
        'none'
      );
    }

    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.filterNavBuyer.nativeElement,
      'display',
      'none'
    );
  }

  closeFilterNav(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '0');
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  closeFilterSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.filterNavBuyer.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  backFilterSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.filterNavBuyer.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
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
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.unitPresentation.nativeElement,
      'display',
      'block'
    );
    this.searchUnitLevelOrders();
  }

  clearBuyer(): void {
    this.filterForm.get('buyerFilter')?.reset();
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(
      this.buyerPresentation.nativeElement,
      'display',
      'block'
    );
    this.searchUnitLevelOrders();
  }

  clearUnitMobile(): void {
    this.filterFormMobile.get('unitFilterMobile')?.reset();
    this.renderer.setStyle(
      this.unitButtonMobile.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(
      this.unitPresentationMobile.nativeElement,
      'display',
      'block'
    );
    this.searchUnitLevelOrdersForMobile();
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  clearBuyerMobile(): void {
    this.filterFormMobile.get('buyerFilterMobile')?.reset();
    this.renderer.setStyle(
      this.buyerButtonMobile.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(
      this.buyerPresentationMobile.nativeElement,
      'display',
      'block'
    );
    this.searchUnitLevelOrdersForMobile();
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  searchBuyer(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer();
      return;
    }
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'block');
    this.renderer.setStyle(
      this.buyerPresentation.nativeElement,
      'display',
      'none'
    );
  }

  searchUnit(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit();
      return;
    }
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'block');
    this.renderer.setStyle(
      this.unitPresentation.nativeElement,
      'display',
      'none'
    );
  }

  searchBuyerMobile(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer();
      return;
    }
    this.renderer.setStyle(
      this.buyerButtonMobile.nativeElement,
      'display',
      'block'
    );
    this.renderer.setStyle(
      this.buyerPresentationMobile.nativeElement,
      'display',
      'none'
    );
  }

  searchUnitMobile(inputElement: HTMLInputElement): void {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit();
      return;
    }
    this.renderer.setStyle(
      this.unitButtonMobile.nativeElement,
      'display',
      'block'
    );
    this.renderer.setStyle(
      this.unitPresentationMobile.nativeElement,
      'display',
      'none'
    );
  }
}
