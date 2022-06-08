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

  // TODO i18n on closed
  ngOnInit() {
    this.openingTimes =
      this.storeDetails?.openingHours?.weekDayOpeningList?.map(
        ({ weekDay, closed, openingTime, closingTime }) => {
          return {
            weekDay: weekDay ?? '',
            openingHours: closed
              ? 'Closed'
              : `${openingTime?.formattedHour ?? ''} - ${
                  closingTime?.formattedHour ?? ''
                }`,
          };
        }
      ) ?? [];
  }
}
