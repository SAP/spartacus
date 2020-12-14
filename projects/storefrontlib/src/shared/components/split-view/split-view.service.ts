import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SplitViewState } from './split/split-view.model';

/**
 * Supposed to be injected in the split view component, so that the split view state
 * is maintained for a single split view.
 */
@Injectable()
export class SplitViewService {
  /**
   * Newly added views are hidden by default, unless it is the first view of the split view.
   * The default hide mode can be overridden.
   */
  defaultHideMode = true;

  protected splitViewCount = 1;

  protected _views$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  /**
   * Adds a view to the list of views. The view is initialized with the `SplitViewState`
   * state. If no state is provided, the state is created with the hidden property. The hidden
   * property is provided by the `defaultHideMode`, unless it's the first view (position: 0).
   */
  add(position: number, initialState?: SplitViewState) {
    const state: SplitViewState = {
      ...{ hidden: position === 0 ? false : this.defaultHideMode },
      ...initialState,
    };
    if (!this.views[position]) {
      this.views[position] = state;
      this.updateState(position, state.hidden);
      this._views$.next(this.views);
    }
  }

  /**
   * The split view is based on a number of views that can be used next to each other.
   * When the number changes (i.e. if the screen goes from wide to small), the visibility state
   * of the views should be updated.
   */
  updateSplitView(splitViewCount: number) {
    if (splitViewCount !== this.splitViewCount) {
      this.splitViewCount = splitViewCount;
      this.updateState();
    }
  }

  /**
   * Returns an observable with the active view number. The active view number
   * represents the last visible view.
   */
  getActiveView(): Observable<number> {
    return this._views$.pipe(
      map((views) => this.getActive(views)),
      distinctUntilChanged()
    );
  }

  /**
   * Returns an observable with the SplitViewState for the given view position.
   */
  getViewState(position: number): Observable<SplitViewState> {
    return this._views$.pipe(
      map((views) => views[position]),
      // we must filter here, since outlet driven views will destroyed the view
      filter((view) => Boolean(view))
    );
  }

  /**
   * Removes a view from the list of views.
   *
   * Removing a view is different from hiding a view. Removing a view is typically done
   * when a component is destroyed.
   *
   * When the view is removed, the SplitViewState is updated to reflect that new organization
   * of views.
   */
  remove(position: number) {
    const activePosition = this.getActive(this.views);
    this._views$.next(this.views.splice(0, position));
    if (activePosition >= position) {
      this.updateState(position);
    }
  }

  /**
   * Returns the next view position. This is useful for views that do not want to be bothered
   * with controlling view numbers.
   */
  get nextPosition(): number {
    return this.views.length || 0;
  }

  /**
   * Toggles the visibility of the views based on the given view position. If the view
   * is already visible, we close the view and active the former view. Unless the hide flag
   * is used, to force the view.
   *
   * The view state of other views in the split view are updated as well.
   *
   * @param position The zero-based position number of the view.
   * @param forceHide The (optional) hide state for the view position.
   */
  toggle(position: number, forceHide?: boolean) {
    // add the view if it hasn't been added before.
    if (!this.views[position]) {
      this.add(position, { hidden: forceHide ?? false });
    }

    // If the position is already visible, we move to a previous position. Only if the hide
    // state is forced, we keep the current position.
    if (
      this.views[position] &&
      forceHide === undefined &&
      !this.views[position].hidden
    ) {
      position--;
    }

    this.updateState(position, forceHide === true);
  }

  /**
   * Updates the hidden state of all the views.
   */
  protected updateState(position?: number, hide?: boolean) {
    const views = [...this.views];
    if (hide !== undefined && views[position]) {
      views[position].hidden = hide;
    }
    let lastVisible =
      views.length - [...views].reverse().findIndex((view) => !view.hidden) - 1;

    if (lastVisible === views.length) {
      if (position) {
        // When there's only 1 view (mobile), we might not find any active
        // if the user navigates back.
        lastVisible = position - 1;
      } else {
        lastVisible = views.length - 1;
      }
    }

    views.forEach((view, pos) => {
      if (view && pos !== position) {
        // hide other views that are outside the split view
        view.hidden =
          pos > lastVisible || pos < lastVisible - (this.splitViewCount - 1);
      }
    });

    this._views$.next(views);
  }

  /**
   * Returns the active view count for the list of views.
   */
  protected getActive(views: SplitViewState[]): number {
    // we reverse the list to find the last visible view
    const l = [...views]
      .reverse()
      .findIndex((view: SplitViewState) => !view.hidden);
    const last = l === -1 ? 0 : views.length - l - 1;
    return last;
  }

  /**
   * Utility method that resolves all views from the subject.
   */
  protected get views(): SplitViewState[] {
    return this._views$.value;
  }
}
