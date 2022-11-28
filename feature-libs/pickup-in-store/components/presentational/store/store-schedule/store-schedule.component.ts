/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnChanges } from '@angular/core';
import { PointOfService } from '@spartacus/core';

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
