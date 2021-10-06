import { Component, Input, OnInit } from '@angular/core';
import { PointOfService, WeekdayOpeningDay } from '@spartacus/core';

@Component({
  selector: 'cx-schedule',
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
  @Input()
  location: PointOfService;

  weekDays: WeekdayOpeningDay[];

  constructor() {}

  ngOnInit(): void {
    if (this.location) {
      this.weekDays = this.location.openingHours
        ?.weekDayOpeningList as WeekdayOpeningDay[];
    }
  }
}
