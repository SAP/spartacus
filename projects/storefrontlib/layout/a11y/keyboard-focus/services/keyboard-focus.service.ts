import { Injectable } from '@angular/core';
import { LockFocusService } from '../lock/lock-focus.service';

@Injectable({
  providedIn: 'root',
})
export class KeyboardFocusService extends LockFocusService {}
