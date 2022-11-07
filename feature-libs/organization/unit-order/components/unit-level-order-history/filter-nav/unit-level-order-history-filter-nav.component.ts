import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ICON_TYPE} from "@spartacus/storefront";
import { TranslationService } from '@spartacus/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderHistoryQueryParams} from "../../../core/model/augmented-core.model";

@Component({
  selector: 'cx-unit-level-order-history-filter-nav',
  templateUrl: './unit-level-order-history-filter-nav.component.html',
  styleUrls: ['./unit-level-order-history-filter-nav.component.css']
})
export class UnitLevelOrderHistoryFilterNavComponent implements OnInit {

  iconTypes = ICON_TYPE;
  encodedFilter: string;
  filterByBuyer = 'filterByBuyer';
  filterByUnit = 'filterByUnit';

  filterFormMobile: FormGroup = new FormGroup({
    inputFilter_Buyer: new FormControl(),
    inputFilter_Unit: new FormControl(),
  });

  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor( protected translation: TranslationService) { }

  ngOnInit(): void {
  }

  formSearch(): void {
    let filters: string[] = [];
    let user = this.filterFormMobile.get('inputFilter_Buyer')?.value;
    let unit = this.filterFormMobile.get('inputFilter_Unit')?.value;

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage : 0,
      filters : this.encodedFilter,
    });
  }

  closeNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";
  }
  closeSubNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "0";
  }

  backSubNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "100%";
  }

  resetForm(): void {
    this.filterFormMobile.reset();
    this.formSearch();
  }

  launchSubNav(option: string){

    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";

    if(option === 'filterByUnit') {
      document.getElementById("cx-unit-level-order-history-filter-nav-sub-unit").style.width = "100%";
    }else if(option === 'filterByBuyer'){
      document.getElementById("cx-unit-level-order-history-filter-nav-sub-buyer").style.width = "100%";
    }
  }
}
