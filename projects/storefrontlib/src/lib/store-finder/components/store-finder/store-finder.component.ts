import { Component, OnInit } from '@angular/core';
import { StoreLocation } from '../../models/location';

@Component({
  selector: 'y-store-finder',
  templateUrl: './store-finder.component.html',
  styleUrls: ['./store-finder.component.scss']
})
export class StoreFinderComponent implements OnInit {
   locations: Array<StoreLocation>;
   current_date =  new Date();

    l1: StoreLocation = {
      storeName: "Costco",
      civicCode: "5045",
      streetName: "Elm Street",
      postalCode: "H1R 0S2",
      country: "Canada",
      sundayHours : {opening_time: "9:00", closing_time: "5:00"},
      mondayHours : {opening_time: "9:00", closing_time: "5:00"},
      tuesdayHours: {opening_time: "9:00", closing_time: "6:00"},
      wednesdayHours: {opening_time: "9:00", closing_time: "5:00"},
      thursdayHours: {opening_time: "9:00", closing_time: "5:00"},
      fridayHours: {opening_time: "9:00", closing_time: "5:00"},
      saturdayHours: {opening_time: "9:00", closing_time: "5:00"},
      holidayHours: {date: this.current_date, isOpen: true, opening_time: "8:00", closing_time: "3:00"}
    };
  constructor() {
    this.locations = [];
  }

  ngOnInit() {
    this.locations.push(this.l1);
    this.locations.push(this.l1);
    this.locations.push(this.l1);
  }

  getDirections(location: StoreLocation) {

  }

}
