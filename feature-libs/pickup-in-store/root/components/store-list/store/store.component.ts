import { Component, Input, OnInit } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-store',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  @Input()
  storeDetails: PointOfService = {};

  iconTypes = ICON_TYPE;

  openHoursOpen = false;

  openingHoursTextArray: Array<Array<string>> = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.storeDetails.openingHours);
    this.openingHoursTextArray =
      this.storeDetails?.openingHours?.weekDayOpeningList?.map((entry) => {
        console.log('entry', entry);
        // return `${entry.weekDay}  ${entry.openingTime?.formattedHour} - ${entry.closingTime?.formattedHour}`;
        // return `${entry.weekDay} ${entry.closed ? 'Closed' : entry.openingTime?.formattedHour + ' - ' + entry.closingTime?.formattedHour}`;

        return [
          entry.weekDay,
          `${
            entry.closed
              ? 'Closed'
              : entry.openingTime?.formattedHour +
                ' - ' +
                entry.closingTime?.formattedHour
          }`,
        ];
      }) ?? [];

    console.log('this.openingHoursText', this.openingHoursTextArray);
  }

  selectStore(event: MouseEvent): void {
    // event.stopPropagation();
    event.preventDefault();
    console.log('Store Selected');
  }

  toggleOpenHours(): void {
    this.openHoursOpen = !this.openHoursOpen;
  }
}
