import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventRegister {
  private _register = {};

  /**
   *
   * @param eventName
   * @param callback
   */
  register(eventName: any, callback: Observable<any>): void {
    this._register[eventName] = callback;
  }

  /**
   * Returns an observable to emit the event
   */
  get(event: string): Observable<any> {
    return this._register[event] ? this._register[event] : of();
  }
}
