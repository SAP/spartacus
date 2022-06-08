import { Component, Input, OnInit } from '@angular/core';
import { PointOfService } from '@spartacus/core';

type OpeningTime = {
  weekDay: string;
  openingHours: string;
};

@Component({
  selector: 'cx-store-schedule',
  templateUrl: 'store-schedule.component.html',
})
export class StoreScheduleComponent implements OnInit {
  @Input()
  storeDetails: PointOfService = {};

  openingTimes: OpeningTime[] = [];

  constructor() {}

  ngOnInit() {
    this.openingTimes =
      this.storeDetails?.openingHours?.weekDayOpeningList?.map(
        ({ weekDay, closed, openingTime, closingTime }) => {
          return {
            weekDay: weekDay ?? '',
            closed,
            openingHours: `${openingTime?.formattedHour ?? ''} - ${
              closingTime?.formattedHour ?? ''
            }`,
          };
        }
      ) ?? [];
  }
}
