import {Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild} from '@angular/core';
import {TranslationService} from '@spartacus/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderHistoryQueryParams} from '../../../core/model/augmented-core.model';
import {ICON_TYPE} from "@spartacus/storefront";

@Component({
  selector: 'cx-unit-level-order-history-filter',
  templateUrl: './unit-level-order-history-filter.component.html',
  styleUrls: ['./unit-level-order-history-filter.component.css']
})
export class UnitLevelOrderHistoryFilterComponent {
  iconTypes = ICON_TYPE;
  encodedFilter: string;

  filterForm: FormGroup = new FormGroup({
    userFilter: new FormControl(),
    unitFilter: new FormControl(),
  });

  filterFormMobile: FormGroup = new FormGroup({
    inputFilterBuyer: new FormControl(),
    inputFilterUnit: new FormControl(),
  });

  @ViewChild('queryInputBuyer') queryInputBuyer: ElementRef;
  @ViewChild('queryInputUnit') queryInputUnit: ElementRef;
  @ViewChild('queryInputBuyerMobile') queryInputBuyerMobile: ElementRef;
  @ViewChild('queryInputUnitMobile') queryInputUnitMobile: ElementRef;

  @ViewChild('unitButton', {read: ElementRef}) unitButton: ElementRef;
  @ViewChild('buyerButton', {read: ElementRef}) buyerButton: ElementRef;
  @ViewChild('unitButtonMobile', {read: ElementRef}) unitButtonMobile: ElementRef;
  @ViewChild('buyerButtonMobile', {read: ElementRef}) buyerButtonMobile: ElementRef;

  @ViewChild('unitPresentation', {read: ElementRef}) unitPresentation: ElementRef;
  @ViewChild('buyerPresentation', {read: ElementRef}) buyerPresentation: ElementRef;
  @ViewChild('unitPresentationMobile', {read: ElementRef}) unitPresentationMobile: ElementRef;
  @ViewChild('buyerPresentationMobile', {read: ElementRef}) buyerPresentationMobile: ElementRef;


  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor(
    protected translation: TranslationService,
    protected renderer: Renderer2,
  ) {
  }

  formSearch(): void {
    let filters: string[] = [];
    let user = this.queryInputBuyer?.nativeElement?.value;
    let unit = this.queryInputUnit?.nativeElement?.value;

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.emitFilterEvent(filters);
  }

  emitFilterEvent(filters: string[]): void {
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage: 0,
      filters: this.encodedFilter,
    });
  }

  resetForm(): void {
    this.filterForm.reset();
    this.filterFormMobile.reset();
    this.formSearch();

    this.renderer.setStyle(this.unitButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'none');

    this.renderer.setStyle(this.unitPresentationMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentationMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.unitPresentation.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentation.nativeElement, 'display', 'block');
  }

  refresh(user: string, unit: string) {
    let filters: string[] = [];
    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');

    this.encodedFilter = filters.join(':');
  }

  launch(): void {
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "100%";
  }

  formSearchMobile(): void {
    let filters: string[] = [];
    let user = this.queryInputBuyerMobile?.nativeElement?.value;
    let unit = this.queryInputUnitMobile?.nativeElement?.value;

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.emitFilterEvent(filters);

    document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "100%";
  }

  closeNav(): void {
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";
  }

  closeSubNav(): void {
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "0";
  }

  backSubNav(): void {
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "100%";
  }

  launchSubNav(option: string): void {
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";

    if (option === 'filterByUnit') {
      document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "100%";
    } else if (option === 'filterByBuyer') {
      document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "100%";
    }
  }

  clearUnit(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    inputElement.focus();
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.unitPresentation.nativeElement, 'display', 'block');
  }

  clearBuyer(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    inputElement.focus();
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerPresentation.nativeElement, 'display', 'block');
  }

  clearUnitMobile(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    inputElement.focus();
    this.renderer.setStyle(this.unitButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.unitPresentationMobile.nativeElement, 'display', 'block');
  }

  clearBuyerMobile(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    inputElement.focus();
    this.renderer.setStyle(this.buyerButtonMobile.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.buyerPresentationMobile.nativeElement, 'display', 'block');
  }

  searchBuyer(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer(inputElement);
      return;
    }
    this.renderer.setStyle(this.buyerButton.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentation.nativeElement, 'display', 'none');
  }

  searchUnit(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit(inputElement);
      return;
    }
    this.renderer.setStyle(this.unitButton.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.unitPresentation.nativeElement, 'display', 'none');
  }

  searchBuyerMobile(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearBuyer(inputElement);
      return;
    }
    this.renderer.setStyle(this.buyerButtonMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.buyerPresentationMobile.nativeElement, 'display', 'none');
  }

  searchUnitMobile(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    if (!value || value === '') {
      this.clearUnit(inputElement);
      return;
    }
    this.renderer.setStyle(this.unitButtonMobile.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.unitPresentationMobile.nativeElement, 'display', 'none');
  }
}
