/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { BaseSiteService, CxDatePipe, TimeUtils } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ServiceOrderConfig } from '../model/checkout-service-details.model';

const dateFormat = 'yyyy-MM-dd';

@Injectable()
export class CheckoutServiceSchedulePickerService {
  protected baseSiteService = inject(BaseSiteService);
  protected datePipe = inject(CxDatePipe);

  /**
   * Returns the minimum date for scheduling a service.
   * It is the current date + lead days from the base site configuration.
   */
  getMinDateForService(): string {
    const config = this.getServiceOrderConfiguration();
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + (config?.leadDays ?? 0) + 1);
    return this.datePipe.transform(minDate, dateFormat) ?? '';
  }

  /**
   * Returns an array of service schedule times in HH:MM format (24-hour clock).
   * Example: ['08:00', '12:00', '16:00']
   */
  getScheduledServiceTimes(): string[] {
    return this.getServiceOrderConfiguration()?.serviceScheduleTimes ?? [];
  }

  /**
   * Retrieves the Service Order Configuration object with lead days and service schedule times.
   * This method returns an observable since it depends on asynchronous data.
   */
  getServiceOrderConfiguration(): ServiceOrderConfig | undefined {
    const config = { leadDays: 0, serviceScheduleTimes: [] as string[] };
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
   * Converts a date and time string into DateTime format including timezone offset.
   * @param date Date in YYYY-MM-DD format. Example: '2024-06-27'
   * @param time Time in HH:MM format (24-hour clock). Example: '14:30'
   * @returns String in DateTime format with timezone offset.
   * Example: 2024-06-27T14:30:00±HH:MM (based on your local timezone offset)
   */
  convertToDateTime(date: string, time: string): string {
    const dateTimeString = `${date}T${time}:00`;
    const timezoneOffset = TimeUtils.getLocalTimezoneOffset();
    return `${dateTimeString}${timezoneOffset}`;
  }

  /**
   * Converts a DateTime string with timezone offset into a readable string format.
   * @param dateTime String in DateTime format with timezone offset.
   * Example: 2024-07-11T14:30:00+05:30
   * @returns Readable string format. Example: 11/07/2024, 14:30
   */
  convertDateTimeToReadableString(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString().slice(0, -3);
  }

  /**
   * Converts a string containing both date and time into an object with separate properties - date and time.
   * @param input Date and time in format `DD/MM/YYYY, HH:mm:ss`
   * @returns Object with date and time separately as { date: 'YYYY-MM-DD', time: 'HH:mm' }
   */
  getServiceDetailsFromDateTime(input: string): { date: string; time: string } {
    const [datePart, timePart] = input.split(', ');
    const [day, month, year] = datePart.split('/');
    const date = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );
    const [hours, minutes] = timePart.split(':');
    return {
      date: this.datePipe.transform(date, dateFormat) ?? '',
      time: `${hours}:${minutes}`,
    };
  }
}
