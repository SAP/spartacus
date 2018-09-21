import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'y-store-list-page-layout',
  templateUrl: './store-list-page-layout.component.html',
  styleUrls: ['./store-list-page-layout.component.scss']
})
export class StoreListPageLayoutComponent implements OnInit {
  query: string;
  showMapListComponent: boolean;

  constructor() {}

  ngOnInit() {}
}
