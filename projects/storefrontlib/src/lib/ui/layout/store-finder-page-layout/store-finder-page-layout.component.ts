import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'y-store-locator-page-layout',
  templateUrl: './store-finder-page-layout.component.html',
  styleUrls: ['./store-finder-page-layout.component.scss']
})
export class StoreFinderPageLayoutComponent implements OnInit {

  storeFinder = new FormControl('');

  constructor() {}

  ngOnInit() {
  }

}
