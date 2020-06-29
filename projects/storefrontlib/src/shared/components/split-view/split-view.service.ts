import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ViewState } from './split/split-view.model';

/**
 * Supposed to be injected in the split view component, so that the view state
 * is maintained in the context of a single split view.
 */
@Injectable({
  providedIn: 'root',
})
export class SplitViewService {
  protected _views$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  /**
   * Resolves the max number of visible views for the split view.
   */
  visibleViewCount(): Observable<number> {
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
   * Adds a view to the list of views. The view is initialized with the
   * hide state, which defaults to false.
   */
  add(viewPosition: number, hide = false) {
    if (!this.views[viewPosition]) {
      this.views[viewPosition] = { hidden: hide };
      this._views$.next(this.views);
    }
  }

  /**
   * Removes a view from the list of views.
   */
  remove(viewPosition: number) {
    this._views$.next(this.views.splice(0, viewPosition));
  }

  /**
   * Toggles the visible state for the given view. An optional
   * force argument can be used to dictate the visibility.
   */
  toggle(viewPosition: number, force?: boolean) {
    if (!this.views[viewPosition]) {
      this.add(viewPosition, force ?? false);
    } else {
      this.views[viewPosition].hidden =
        force ?? !this.views[viewPosition].hidden;
      // Whenever a view is closing, we close all underlying views as well.
      if (!this.views[viewPosition].hidden) {
        this.views
          .slice(viewPosition + 1)
          .map((viewState) => (viewState.hidden = true));
      }
      this._views$.next(this.views);
    }
  }

  /**
   * Returns the next view number, that can be used by views to register itself.
   */
  generateNextPosition(): number {
    return this.views.length;
  }

  /**
   * Utility method that resolves all views.
   */
  protected get views(): ViewState[] {
    return this._views$.value;
  }
}
