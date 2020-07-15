import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
const TIMEOUT = 500;
/**
 * Guard that can be used in split-view based child routes. This guard
 * delays the guard to be removed with 500ms, so that any css transition can be
 * finished before the DOM is destroyed.
 */
@Injectable({
  providedIn: 'root',
})
export class SplitViewDeactivateGuard implements CanDeactivate<boolean> {
  canDeactivate(): Observable<boolean> {
    return timer(TIMEOUT).pipe(map(() => true));
  }
}
