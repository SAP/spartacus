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

  @ViewChild('filterNav', {read: ElementRef}) filterNav:ElementRef;
  @ViewChild('filterNavUnit', {read: ElementRef}) filterNavUnit:ElementRef;
  @ViewChild('filterNavBuyer', {read: ElementRef}) filterNavBuyer:ElementRef;

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
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
  }

  formSearchMobile(): void {
    let filters: string[] = [];
    let user = this.queryInputBuyerMobile?.nativeElement?.value;
    let unit = this.queryInputUnitMobile?.nativeElement?.value;

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.emitFilterEvent(filters);

    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
  }

  closeNav(): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNav.nativeElement, 'width', '0');
  }

  closeSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
  }

  backSubNav(): void {
    this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'flex');
  }

  launchSubNav(option: string): void {
    this.renderer.setStyle(this.filterNav.nativeElement, 'display', 'none');

    if (option === 'filterByUnit') {
      this.renderer.setStyle(this.filterNavUnit.nativeElement, 'display', 'block');
    } else if (option === 'filterByBuyer') {
      this.renderer.setStyle(this.filterNavBuyer.nativeElement, 'display', 'block');
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
