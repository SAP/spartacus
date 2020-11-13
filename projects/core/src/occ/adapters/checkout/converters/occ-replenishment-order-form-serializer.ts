import { Injectable } from '@angular/core';
import { TimeUtils } from '@spartacus/core';
import { ScheduleReplenishmentForm } from '../../../../model/replenishment-order.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccReplenishmentOrderFormSerializer
  implements
    Converter<Occ.ScheduleReplenishmentForm, ScheduleReplenishmentForm> {
  convert(
    source: Occ.ScheduleReplenishmentForm,
    target?: ScheduleReplenishmentForm
  ): ScheduleReplenishmentForm {
    if (target === undefined) {
      target = { ...(source as any) };
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
      hour12: false,
    });
    return `${date}T${localTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
  }
}
