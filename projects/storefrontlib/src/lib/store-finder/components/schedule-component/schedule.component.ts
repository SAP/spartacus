import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StoreDataService } from '../../services';

const WEEK_DAYS_NUMBER = 7;

@Component({
  selector: 'y-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnChanges {
  @Input() location: any;
  days: Date[] = [];

  constructor(public storeDataService: StoreDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < WEEK_DAYS_NUMBER; i++) {
      this.days.push(new Date(currentDate.valueOf()));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
}
