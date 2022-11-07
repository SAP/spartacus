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



  //
  // resetForm(): void {
  //   this.filterFormMobile.reset();
  //   this.formSearch();
  // }


}
