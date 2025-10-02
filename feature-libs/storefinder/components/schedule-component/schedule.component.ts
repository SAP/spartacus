/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnInit } from '@angular/core';
import { PointOfService, WeekdayOpeningDay } from '@spartacus/core';
import { NgIf, NgFor } from '@angular/common';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-schedule',
  templateUrl: './schedule.component.html',
  imports: [NgIf, NgFor, TranslatePipe, MockTranslatePipe],
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
