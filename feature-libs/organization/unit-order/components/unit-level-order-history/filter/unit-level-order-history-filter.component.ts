import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TranslationService } from '@spartacus/core';
import Timeout = NodeJS.Timeout;
import {FormControl, FormGroup} from "@angular/forms";
import { OrderHistoryQueryParams } from '../../../core/model/augmented-core.model'

@Component({
  selector: 'cx-unit-level-order-history-filter',
  templateUrl: './unit-level-order-history-filter.component.html',
  styleUrls: ['./unit-level-order-history-filter.component.css']
})
export class UnitLevelOrderHistoryFilterComponent implements OnInit {

  timeout: Timeout;
  encodedFilter: string;


  filterForm: FormGroup = new FormGroup({
    userFilter: new FormControl(),
    unitFilter: new FormControl(),
  });


  @Output()
  filterListEvent = new EventEmitter<OrderHistoryQueryParams>();

  constructor(
    protected translation: TranslationService,
  ) { }

  ngOnInit(): void {
  }

  formSearch(): void {

    let filters: string[] = [];

    // this.filterForm.get('userFilter')
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

    // this.userFilter.reset();
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
}
