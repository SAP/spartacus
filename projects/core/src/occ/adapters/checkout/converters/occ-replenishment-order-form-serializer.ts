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
   * Converts the date string from a Standard ISO 8601 to valid datetime string with timezone
   * Eg date format:  2020-10-15T15:38:05-05:00
   */
  private convertDate(date: string): string {
    const trimmedDate = date.slice(0, date.lastIndexOf(':'));
    return this.dateTimePickerFormatterService.toModel(trimmedDate);
  }
}
