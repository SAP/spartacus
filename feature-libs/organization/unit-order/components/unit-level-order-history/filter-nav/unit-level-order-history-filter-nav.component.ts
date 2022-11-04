import { Component, OnInit } from '@angular/core';
import {ICON_TYPE} from "@spartacus/storefront";

@Component({
  selector: 'cx-unit-level-order-history-filter-nav',
  templateUrl: './unit-level-order-history-filter-nav.component.html',
  styleUrls: ['./unit-level-order-history-filter-nav.component.css']
})
export class UnitLevelOrderHistoryFilterNavComponent implements OnInit {

  iconTypes = ICON_TYPE;
  constructor() { }

  ngOnInit(): void {
  }

  closeNav(){
    document.getElementById("cx-unit-level-order-history-filter-nav").style.width = "0";
  }
}
