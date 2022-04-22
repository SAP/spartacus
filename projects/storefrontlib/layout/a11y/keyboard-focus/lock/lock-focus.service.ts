import { Injectable } from '@angular/core';
import { TrapFocusService } from '../trap/trap-focus.service';

@Injectable({
  providedIn: 'root',
})
export class LockFocusService extends TrapFocusService {}
