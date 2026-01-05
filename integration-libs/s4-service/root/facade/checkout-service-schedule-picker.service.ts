/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { BaseSiteService, CxDatePipe, TimeUtils } from '@spartacus/core';
import { map, take } from 'rxjs/operators';
import { ServiceOrderConfig } from '../model/checkout-service-details.model';
import { Observable } from 'rxjs';

const dateFormat = 'yyyy-MM-dd';

@Injectable()
export class CheckoutServiceSchedulePickerService {
  protected baseSiteService = inject(BaseSiteService);
  protected datePipe = inject(CxDatePipe);

  /**
   * Returns the minimum date for scheduling a service.
   * It is the current date + lead days from the base site configuration.
   */
  getMinDateForService(): Observable<string> {
    return this.getServiceOrderConfiguration().pipe(
      map((config) => {
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + (config?.leadDays ?? 0) + 1);
        return this.datePipe.transform(minDate, dateFormat) ?? '';
      })
    );
  }

  /**
   * Returns an array of service schedule times in HH:MM format (24-hour clock).
   * Example: ['08:00', '12:00', '16:00']
   */
  getScheduledServiceTimes(): Observable<string[]> {
    return this.getServiceOrderConfiguration().pipe(
      map((config) => config?.serviceScheduleTimes ?? [])
    );
  }

  /**
   * Retrieves the Service Order Configuration object with lead days and service schedule times.
   * This method returns an observable since it depends on asynchronous data.
   */
  getServiceOrderConfiguration(): Observable<ServiceOrderConfig | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => {
        const config = { leadDays: 0, serviceScheduleTimes: [] as string[] };
        config.leadDays =
          baseSite?.baseStore?.serviceOrderConfiguration?.leadDays ?? 0;
        config.serviceScheduleTimes =
          baseSite?.baseStore?.serviceOrderConfiguration
            ?.serviceScheduleTimes ?? ([] as string[]);
        return config;
      })
    );
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
   * @returns Readable string format. Example: 11/07/2024, 02:30:00 PM
   */
  convertDateTimeToReadableString(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }

  /**
   * Converts a string containing both date and time into an object with separate properties - date and time.
   * @param input Date and time in format `MM/DD/YYYY, HH:mm:ss`
   * @returns Object with date and time separately as { date: 'YYYY-MM-DD', time: 'HH:mm' }
   */
  getServiceDetailsFromDateTime(input: string): { date: string; time: string } {
    const inputDate = new Date(input);
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    return {
      date: this.datePipe.transform(inputDate, dateFormat) ?? '',
      time: `${hours}:${minutes}`,
    };
  }

  /**
   * Calculates the difference in hours between a scheduled date of a service and the current date.
   * @param dateTime The dateTime to check in string format.
   * @returns Number representing the difference in hours.
   */
  getHoursFromServiceSchedule(dateTime: string): number {
    const now = new Date();
    const targetDateTime = new Date(dateTime);
    const differenceInMilliseconds = targetDateTime.getTime() - now.getTime();
    return differenceInMilliseconds / (1000 * 60 * 60);
  }
}
