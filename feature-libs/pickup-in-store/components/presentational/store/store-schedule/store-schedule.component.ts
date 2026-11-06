/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { PointOfService, TranslatePipe } from '@spartacus/core';

type OpeningTime = {
  weekDay?: string;
  openingHours?: string;
  closed?: boolean;
};

/**
 * A presentational component for a store's opening hours
 */
@Component({
  selector: 'cx-store-schedule',
  templateUrl: 'store-schedule.component.html',
  imports: [NgFor, NgIf, TranslatePipe],
})
export class StoreScheduleComponent implements OnChanges {
  /** The details of the store */
  @Input() storeDetails: PointOfService = {};

  openingTimes: OpeningTime[] = [];

  ngOnChanges() {
    this.openingTimes =
      this.storeDetails?.openingHours?.weekDayOpeningList?.map(
        ({ weekDay, closed, openingTime, closingTime }) => {
          return {
            openingHours: `${openingTime?.formattedHour ?? ''} - ${
              closingTime?.formattedHour ?? ''
            }`,
            weekDay: weekDay ?? '',
            closed,
          };
        }
      ) ?? [];
  }
}
