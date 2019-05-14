import { Injectable } from '@angular/core';
import { UserAdapter } from './user.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserConnector {
  constructor(private adapter: UserAdapter) {}
}
