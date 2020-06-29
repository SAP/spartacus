import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ViewState } from './split-view.model';

/**
 * Supposed to be injected in the split view component, so that the view state
 * is maintained in the context of a single split view.
 */
@Injectable({
  providedIn: 'root',
})
export class SplitViewService {
  /**
   * Keeps the UI view state of all views.
   */
  protected _views$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  /**
   * Resolves the max number of visible views for the split view.
   */
  get visible$(): Observable<number> {
    return this._views$.pipe(
      map((views) => {
        const hidden = views.findIndex((view) => view.hide);
        return hidden === -1 ? views.length : hidden;
      }),
      filter((visible) => visible > 0),
      distinctUntilChanged()
    );
  }

  /**
   * Adds a view to the list of views for the current split view.
   * The view is initialized with the hide state, which defaults to false.
   */
  add(view: number, hide = false) {
    if (!this.views[view]) {
      this.views[view] = { hide };
      this._views$.next(this.views);
    }
  }

  remove(view: number) {
    this._views$.next(this.views.splice(0, view));
  }

  toggle(view: number, force?: boolean) {
    if (!this.views[view]) {
      this.add(view, force ?? false);
    } else {
      this.views[view].hide = force ?? !this.views[view].hide;
      // Whenever a view is closing, we close all underlying views as well.
      if (!this.views[view].hide) {
        this.views.slice(view + 1).map((viewState) => (viewState.hide = true));
      }
      this._views$.next(this.views);
    }
  }

  protected get views(): ViewState[] {
    return this._views$.value;
  }

  get nextViewNum(): number {
    return this.views.length;
  }
}
