import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimer',
})
export class FormatTimerPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    if (totalSeconds < 0) {
      totalSeconds = 0;
    }
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    const zeroPaddedMinutes: string = ('00' + minutes).slice(-2);
    const zeroPaddedSeconds: string = ('00' + seconds).slice(-2);
    return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
  }
}
