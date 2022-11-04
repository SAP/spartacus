import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TranslationService } from '@spartacus/core';
import Timeout = NodeJS.Timeout;
import {FormControl, FormGroup} from "@angular/forms";
import { OrderHistoryQueryParams } from '../../../core/model/augmented-core.model';
import {ICON_TYPE, BreakpointService} from "@spartacus/storefront";

@Component({
  selector: 'cx-unit-level-order-history-filter',
  templateUrl: './unit-level-order-history-filter.component.html',
  styleUrls: ['./unit-level-order-history-filter.component.css']
})
export class UnitLevelOrderHistoryFilterComponent implements OnInit {

  iconTypes = ICON_TYPE;
  CLOSE_DELAY = 300;
  timeout: Timeout;
  encodedFilter: string;
  searchByTitle: string;
  filterByTitle: string;

  filterForm: FormGroup = new FormGroup({
    userFilter: new FormControl(),
    unitFilter: new FormControl(),
  });


  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor(
    protected translation: TranslationService,
    protected breakpointService: BreakpointService,
  ) { }

  ngOnInit(): void {
  }

  formSearch(): void {
    let filters: string[] = [];
    let user = this.filterForm.get('userFilter')?.value;
    let unit = this.filterForm.get('unitFilter')?.value;

    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');
    this.encodedFilter = filters.join(':');

    this.filterListEvent.emit({
      currentPage : 0,
      filters : this.encodedFilter,
    });
  }

  onFiltering() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.refresh(this.filterForm.get('userFilter')?.value, this.filterForm.get('unitFilter')?.value);

    }, 400);
  }

  resetForm(): void {
    this.filterForm.reset();
    this.formSearch();
  }

  refresh(user: string, unit: string) {
    let filters: string[] = [];
    user?.length ? filters.push('user:' + user) : '';
    unit?.length ? filters.push('unit:' + unit) : '';
    filters.unshift(filters.length ? ':' : '');

    this.encodedFilter = filters.join(':');
  }

  launch() {
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "100%";
  }

  closeNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";
  }
  closeSubNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav-sub").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";
  }

  backSubNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav-sub").style.width = "0";
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "100%";
  }
  launchSubNav(option: string){
    document.getElementById("cx-unit-level-order-history-filter-nav-sub").style.width = "100%";
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";

    if(option === 'filterByUnit') {
      this.translation.translate('unitLevelOrderHistory.unit').subscribe( (label:string) => {
        this.searchByTitle = label
      });
      this.translation.translate('unitLevelOrderHistory.filterByUnit').subscribe( (label:string) => {
        this.filterByTitle = label
      });
    }else if(option === 'filterByBuyer'){
       this.translation.translate('unitLevelOrderHistory.searchByBuyer').subscribe( (label:string) => {
         this.searchByTitle = label
       });
       this.translation.translate('unitLevelOrderHistory.filterByBuyer').subscribe( (label:string) => {
         this.filterByTitle = label
       });
    }
  }
}
