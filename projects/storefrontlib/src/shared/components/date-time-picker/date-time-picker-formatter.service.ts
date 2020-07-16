import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimePickerFormatterService {
  // Patching dates with offsets:
  // When dates come from the backend, they are incorrectly formatted to display in a datetime-local input
  // They also do not display the correct datetime according do our locale, thus we are patching it with the local offset to correct it.
  // Can probably also move this logic to some converter or service so it arrives here simply as usable.
  toNative(value: string): string {
    return value
      ? this.formatDateStringWithTimezone(
          value,
          this.getLocalTimezoneOffset(true)
        )
      : null;
  }

  toModel(value: string): string {
    return value ? `${value}:00${this.getLocalTimezoneOffset()}` : null;
  }

  // Invert boolean is used here to subtract/add an offset when we want to reverse an effect
  getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = this.padWithZeroes(
      Math.abs(Math.floor(offset / 60)).toString(),
      2
    );
    const minutes = this.padWithZeroes((offset % 60).toString(), 2);
    return offset >= 0
      ? !invert
        ? `+${hours}:${minutes}`
        : `-${hours}:${minutes}`
      : !invert
      ? `-${hours}:${minutes}`
      : `+${hours}:${minutes}`;
  }

  // Format this to a converter (incoming)
  protected formatDateStringWithTimezone(dateString: string, offset: string) {
    return new Date(dateString.replace('+0000', offset))
      .toISOString()
      .substring(0, 16);
  }

  // Helper function - add to prototypes?
  protected padWithZeroes(str: string, max: number) {
    str = str.toString();
    return str.length < max ? this.padWithZeroes('0' + str, max) : str;
  }
}
