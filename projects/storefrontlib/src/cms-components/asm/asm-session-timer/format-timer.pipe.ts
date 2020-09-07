import { Pipe, PipeTransform } from '@angular/core';

const SIXTY_SECONDS = 60;
const TEN_MINUTES = 10;

@Pipe({
  name: 'formatTimer',
})
export class FormatTimerPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    const START = -2;
    if (totalSeconds < 0) {
      totalSeconds = 0;
    }
    const minutes: number = Math.floor(totalSeconds / SIXTY_SECONDS);
    const seconds: number = totalSeconds % SIXTY_SECONDS;
    let zeroPaddedMinutes: string;
    if (minutes < TEN_MINUTES) {
      zeroPaddedMinutes = ('00' + minutes).slice(START);
    } else {
      zeroPaddedMinutes = minutes + '';
    }
    const zeroPaddedSeconds: string = ('00' + seconds).slice(START);
    return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
  }
}
