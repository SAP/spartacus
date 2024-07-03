/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { BaseSiteService, CxDatePipe, TimeUtils } from '@spartacus/core';
import { ServiceOrderConfig } from 'integration-libs/s4-service/checkout/root/public_api';
import { take } from 'rxjs';

@Injectable()
export class CheckoutServiceSchedulePickerService {
  protected baseSiteService = inject(BaseSiteService);
  protected datePipe = inject(CxDatePipe);

  getMinDateForService(): string {
    const config = this.getServiceOrderConfiguration();
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + ((config?.leadDays ?? 0) + 1)); // min date is the date after the no.of lead days
    return this.datePipe.transform(minDate, 'yyyy-MM-dd') ?? '';
  }

  getScheduledServiceTimes(): string[] {
    return this.getServiceOrderConfiguration()?.serviceScheduleTimes ?? [];
  }

  getServiceOrderConfiguration(): ServiceOrderConfig | undefined {
    let config = { leadDays: 0, serviceScheduleTimes: [] as string[] };
    this.baseSiteService
      .get()
      .pipe(take(1))
      .subscribe((baseSite) => {
        config.leadDays =
          baseSite?.baseStore?.serviceOrderConfiguration?.leadDays ?? 0;
        config.serviceScheduleTimes =
          baseSite?.baseStore?.serviceOrderConfiguration
            ?.serviceScheduleTimes ?? ([] as string[]);
      });
    return config;
  }

  /**
   * Adds the a date and time string into DateTime format including timezone offset
   * @Example
   * Input date = '2024-06-27'; // Date string in YYYY-MM-DD format
   * Input time = '14:30'; // Time string in HH:MM format (24-hour clock)
   * Output: 2024-06-27T14:30:00±HH:MM (based on your local timezone offset)
   *
   */
  convertToDateTime(date: string, time: string): string {
    const dateTimeString = `${date}T${time}:00`;
    const timezoneOffset = TimeUtils.getLocalTimezoneOffset();
    return `${dateTimeString}${timezoneOffset}`;
  }

  convertDateTimeToReadableString(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }

  /**
   * Method to convert string with date and time together into an object with separate properties date and time.
   * @param dateTime date and time in format `DD/MM/YYYY, HH:mm:ss`
   * @returns date and time separately as {date: 'YYYY-MM-DD', time: 'HH:mm'}
   */
  getServiceDetailsFromDateTime(input: string): { date: string; time: string } {
    let output = { date: '', time: '' };

    const [datePart, timePart] = input.split(', ');
    const [day, month, year] = datePart.split('/');

    const date = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );
    output.date = this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';

    const [hours, minutes] = timePart.split(':');
    output.time = `${hours}:${minutes}`;

    return output;
  }
}
