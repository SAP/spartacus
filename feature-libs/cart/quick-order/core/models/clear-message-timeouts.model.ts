import { Subscription } from 'rxjs';

export interface ClearMessageTimouts {
  [key: string]: Subscription;
}
