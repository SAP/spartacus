/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  PointOfService,
  TranslatePipe,
  WeekdayOpeningDay,
} from '@spartacus/core';

@Component({
  selector: 'cx-schedule',
  templateUrl: './schedule.component.html',
  imports: [NgIf, NgFor, TranslatePipe],
})
export class ScheduleComponent implements OnInit {
  @Input()
  location: PointOfService;

  weekDays: WeekdayOpeningDay[];

  constructor() {
    // Intentional empty constructor
  }

  ngOnInit(): void {
    if (this.location) {
      this.weekDays = this.location.openingHours
        ?.weekDayOpeningList as WeekdayOpeningDay[];
    }
  }
}
