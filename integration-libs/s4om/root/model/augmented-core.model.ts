import { ScheduleLine } from './schedule-line.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    scheduleLines?: ScheduleLine[];
  }
}
