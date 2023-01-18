import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cx-listing',
  templateUrl: 'listing.component.html',
})
export class ListingComponent implements OnInit {
  @Input() itemId: string;

  constructor() {}

  ngOnInit() {}
}
