import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'y-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  styleUrls: ['./store-finder-store-description.component.css']
})
export class StoreFinderStoreDescriptionComponent implements OnInit {
  @Input() location: any;

  constructor() {}

  ngOnInit() {}
}
