import { Injectable } from '@angular/core';
import { ScheduleReplenishmentForm } from '../../../../model/replenishment-order.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import { DateTimePickerFormatterService } from '../../../../util/date-time-picker-formatter.service';

@Injectable({ providedIn: 'root' })
export class OccReplenishmentOrderFormSerializer
  implements
    Converter<Occ.ScheduleReplenishmentForm, ScheduleReplenishmentForm> {
  constructor(
    protected dateTimePickerFormatterService: DateTimePickerFormatterService
  ) {}

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
   * Converts the date string from a Standard ISO 860 with or without time to valid OCC model format
   * @Example
   * Converts 2020-10-15T15:38:05 or 2020-10-15 2020-10-15T15:38:05-05:00
   */
  private convertDate(date: string): string {
    const index = date.lastIndexOf(':');
    let modelDate;
    if (index > 0) {
      modelDate = date.slice(0, index);
    } else {
      modelDate = `${date}T${this.getCurrentLocalTime()}`;
    }

    return this.dateTimePickerFormatterService.toModel(modelDate);
  }

  /**
   * Returns local time in hh:mm
   */
  protected getCurrentLocalTime(): string {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return currentTime;
  }
}
