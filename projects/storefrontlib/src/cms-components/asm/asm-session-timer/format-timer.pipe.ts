import { Pipe, PipeTransform } from '@angular/core';

const SIXTY_SECONDS = 60;
const TEN_MINUTES = 10;
const MINUS_TWO = -2;

@Pipe({
  name: 'formatTimer',
})
export class FormatTimerPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    if (totalSeconds < 0) {
      totalSeconds = 0;
    }
    const minutes: number = Math.floor(totalSeconds / SIXTY_SECONDS);
    const seconds: number = totalSeconds % SIXTY_SECONDS;
    let zeroPaddedMinutes: string;
    if (minutes < TEN_MINUTES) {
      zeroPaddedMinutes = ('00' + minutes).slice(MINUS_TWO);
    } else {
      zeroPaddedMinutes = minutes + '';
    }
    const zeroPaddedSeconds: string = ('00' + seconds).slice(MINUS_TWO);
    return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
  }
}
