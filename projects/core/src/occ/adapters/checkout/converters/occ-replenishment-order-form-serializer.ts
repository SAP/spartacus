import { Injectable } from '@angular/core';
import { ScheduleReplenishmentForm } from '../../../../model/replenishment-order.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import { DatePickerFormatterService } from '../../../../util/date-picker-formatter.service';

@Injectable({ providedIn: 'root' })
export class OccReplenishmentOrderFormSerializer
  implements
    Converter<Occ.ScheduleReplenishmentForm, ScheduleReplenishmentForm> {
  constructor(
    protected datePickerFormatterService: DatePickerFormatterService
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
   * Converts the date string to the Standard ISO 8601 format using DatePickerFormatterService
   * Eg date format: 1994-01-11T00:00:00Z
   */
  private convertDate(date: string): string {
    return this.datePickerFormatterService.toISOString(date);
  }
}
