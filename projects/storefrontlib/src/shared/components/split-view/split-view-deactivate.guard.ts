import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Guard that can be used in split-view based child routes. This guard
 * delays the guard to be removed with 300ms, so that any css transition can be
 * finished before the DOM is destroyed.
 *
 * @deprecated no longer in use, will be dropped with next major.
 */
@Injectable({
  providedIn: 'root',
})
export class SplitViewDeactivateGuard implements CanDeactivate<boolean> {
  canDeactivate(): Observable<boolean> {
    return timer(300).pipe(map(() => true));
  }
}
