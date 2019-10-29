import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitter {
  private _register = {};

  /**
   *
   * @param eventName
   * @param callback
   */
  register(eventName: any, callback: Observable<any>): void {
    this._register[eventName] = callback;
  }

  emit(eventName: any, payload: any): void {
    if (!this._register[eventName]) {
      this._register[eventName] = new Subject();
    }
    this._register[eventName].next(payload);
  }

  /**
   * Returns an observable to emit the event
   */
  get(event: string): Observable<any> {
    if (!this._register[event]) {
      this._register[event] = new Subject();
    }
    return this._register[event];
  }
}
