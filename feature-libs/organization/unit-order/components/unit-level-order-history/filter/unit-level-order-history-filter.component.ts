import {Component, EventEmitter, Output} from '@angular/core';
import { TranslationService } from '@spartacus/core';
import {FormControl, FormGroup} from "@angular/forms";
import { OrderHistoryQueryParams } from '../../../core/model/augmented-core.model';
import {ICON_TYPE} from "@spartacus/storefront";

@Component({
  selector: 'cx-unit-level-order-history-filter',
  templateUrl: './unit-level-order-history-filter.component.html',
  styleUrls: ['./unit-level-order-history-filter.component.css']
})
export class UnitLevelOrderHistoryFilterComponent{

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

  // @ViewChild('queryInputUser') queryInputUser; // accessing the reference element
  // @ViewChild('queryInputUnit') queryInputUnit; // accessing the reference element


  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor(
    protected translation: TranslationService
  ) { }

  formSearch(): void {
    let filters: string[] = [];
    let user = this.filterForm.get('userFilter')?.value;
    let unit = this.filterForm.get('unitFilter')?.value;

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.emitFilterEvent(filters);
  }

  emitFilterEvent(filters: string[]){
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage : 0,
      filters : this.encodedFilter,
    });
  }
  resetForm(): void {
    this.filterForm.reset();
    this.filterFormMobile.reset();
    this.formSearch();
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
    let user = this.filterFormMobile.get('inputFilterBuyer')?.value;
    let unit = this.filterFormMobile.get('inputFilterUnit')?.value;

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

    if(option === 'filterByUnit') {
      document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "100%";
    }else if(option === 'filterByBuyer'){
      document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "100%";
    }
  }
  clear(el: HTMLInputElement): void {
    el.value = '';
    el.focus();
  }
}
