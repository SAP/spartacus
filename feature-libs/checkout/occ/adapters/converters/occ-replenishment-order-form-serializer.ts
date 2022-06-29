import { Injectable } from '@angular/core';
import {
  Converter,
  Occ,
  ScheduleReplenishmentForm,
  TimeUtils,
} from '@spartacus/core';

@Injectable()
export class OccReplenishmentOrderFormSerializer
  implements
    Converter<Occ.ScheduleReplenishmentForm, ScheduleReplenishmentForm>
{
  convert(
    source: Occ.ScheduleReplenishmentForm,
    target?: ScheduleReplenishmentForm
  ): ScheduleReplenishmentForm {
    if (target === undefined) {
      target = { ...(source as any) } as ScheduleReplenishmentForm;
    }

    if (source.replenishmentStartDate) {
      target.replenishmentStartDate = this.convertDate(
        source.replenishmentStartDate
      );
    }

    return target;
  }

  /**
   * Adds the current timestamp (including timezone offset) to a date string in the format YYYY-mm-dd
   * @Example
   * Converts 2021-10-15 to 2021-10-15T15:38:05-05:00
   */
  private convertDate(date: string): string {
    const localTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    return `${date}T${localTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
  }
}
